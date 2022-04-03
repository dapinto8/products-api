import {Middleware} from 'koa'

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    let message = 'Internal Server Error'
    let details = 'No details available'
    ctx.status = error.statusCode ?? 500

    if (ctx.status !== 500) {
      message = error.message
      details = error?.toJSON() ?? {}  
    }

    ctx.body = {
      timeStamp: Date.now(),
      statusCode: ctx.status,
      message,
      details,
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
    }
  }
}
