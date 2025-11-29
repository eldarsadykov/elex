import { Plugin, ViteDevServer } from 'vite'
import chokidar from 'chokidar'

export function watchExternal(paths: string | string[]): Plugin {
  return {
    name: 'watch-external',
    configureServer(server: ViteDevServer) {
      const watcher = chokidar.watch(paths, {
        ignoreInitial: true
      })

      watcher.on('all', () => {
        console.log('[watch-external] Change detected. Reloading...')
        server.ws.send({ type: 'full-reload' })
      })
    }
  }
}
