import edge from 'edge.js'
import { addCollection, edgeIconify } from 'edge-iconify'
import { icons as lucideIcons } from '@iconify-json/lucide'

/**
 * Register the plugin
 */
edge.use(edgeIconify)

addCollection(lucideIcons)
