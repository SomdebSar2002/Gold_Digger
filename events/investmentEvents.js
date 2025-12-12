import {EventEmitter} from 'node:events'
import {createPDF} from '../utils/createPDF.js'

export const investmentEvents = new EventEmitter()

investmentEvents.on(`money-invested`,createPDF)
// investmentEvents.on(`money-invested`,()=>console.log("hi there!"))
