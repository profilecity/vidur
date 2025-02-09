// types/nitro.d.ts

import 'nitropack'
import consola from 'consola'

declare module 'nitropack' {
  interface NitroApp {
    logger: typeof consola
  }
}
