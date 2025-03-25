import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things:
 * 1. We will skip caching on the edge, which makes it easier to debug
 * 2. We will return an error message on exception in your Response
 */
const DEBUG = false

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

/**
 * Handle the request and serve static assets with proper MIME types and cache headers
 * @param {Event} event
 */
async function handleEvent(event) {
  const url = new URL(event.request.url)
  let options = {}

  try {
    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true,
      }
    }
    
    // Check if the request is for an asset
    const page = await getAssetFromKV(event, options)

    // Custom cache settings for different file types
    const response = new Response(page.body, page)
    
    // Add CORS headers for better compatibility
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    
    // Add cache control for static assets
    if (url.pathname.includes('.js') || 
        url.pathname.includes('.css') || 
        url.pathname.includes('.jpg') || 
        url.pathname.includes('.png') || 
        url.pathname.includes('.svg') ||
        url.pathname.includes('.glb') ||
        url.pathname.includes('.gltf')) {
      response.headers.set('Cache-Control', 'public, max-age=31536000')
    } else {
      // For all other resources (like HTML), use a shorter cache time
      response.headers.set('Cache-Control', 'public, max-age=3600')
    }
    
    return response

  } catch (e) {
    // If the request is not for an asset, or an error occurred, return the index.html
    // This enables client-side routing for single-page applications
    if (e.message.includes('could not find')) {
      try {
        // Try to serve index.html for any non-asset request
        const notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
        })

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 200,
          headers: {
            ...notFoundResponse.headers,
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      } catch (e) {
        return new Response('Not Found', { status: 404 })
      }
    } else {
      return new Response(e.message || e.toString(), { status: 500 })
    }
  }
} 