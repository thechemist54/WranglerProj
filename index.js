// async function handleEvent(event)
// {
//   return new HTMLRewriter()
//   .on("*", new ElementHandler())
//   .onDocument(new DocumentHandler())
// }

const Router = require('./router')
const ex1 = {"name":"example1", "url": "https://www.exampleone.com"}
const ex2 = {"name":"example2", "url": "https://www.exampletwo.com"}
const ex3 = {"name":"example3", "url": "https://www.examplethree.com"}
const arr = [ex1, ex2, ex3]



addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

function handler(request) {
  const init = {
      headers: { 'content-type': 'application/json' },
  }
  const body = JSON.stringify(arr)
  
  return new Response(body, init)
}

class ElementHandler {
  constructor(links)
  {
    this.links = links
    
    
  }
  async element(element) {
    // An incoming element, such as `div`
    var bod = ""
   
    for (var i = 0;i<this.links.length;i++)
    {
     
     
     
     
     
      const html1 =   "<a href ="+this.links[i].url+">"+this.links[i].name+"</a>"
        element.append(html1, {html:true})

     
      
      
      
    }
    
    
    
    
  }

  comments(comment) {
    // An incoming comment
  }

  text(text) {
    // An incoming piece of text
  }
}



class ElementHandler2 {
  
  element(element) {
    // An incoming element, such as `div`
    element.removeAttribute("style")
    
    
  }

 
}

class childHandler {
  
  element(element) {
    // An incoming element, such as `div`
    
   element.setAttribute("src","https://ia902906.us.archive.org/1/items/mbid-285e5c25-8555-49c7-8b80-54c733b305ff/mbid-285e5c25-8555-49c7-8b80-54c733b305ff-25837496057.jpg")
    
  }
}
class childHandler2 {
  
  element(element) {
    // An incoming element, such as `div`
    
   element.append("bhandaa1")
    
  }
}

const hosst = 'https://static-links-page.signalnerve.workers.dev'
const url = hosst+"/static/html"

async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
  else if (contentType.includes("application/text")) {
    return await response.text()
  }
  else if (contentType.includes("text/html")) {
    
    return new HTMLRewriter()
    .on("div#links", new ElementHandler(arr))
    .on("div#profile", new ElementHandler2())
    .on("img#avatar", new childHandler())
    .on("h1#name", new childHandler2()).transform(response).text()
    
  }
  else {
    return await response.text()
  }
}



 async function handler2(request)
{
  
  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  }
  const response = await fetch(url, init)
  const results = await gatherResponse(response)
  return new Response(results, init)

  
}
 

async function handleRequest(req) {
  const r = new Router()
  r.get('/links',req => handler(req))
  r.get('/*',req => handler2(req))
  const res =  await r.route(req)
  return res
  
}






// class DocumentHandler {
//   doctype(doctype) {
//     // An incoming doctype, such as <!DOCTYPE html>
//   }

//   comments(comment) {
//     // An incoming comment
//   }

//   text(text) {
//     // An incoming piece of text
//   }

//   end(end) {
//     // The end of the document
//   }
// }