function search() {
  hlib.getById('viewer').innerHTML = ''
  const params = {
    group: hlib.getSelectedGroup(),
    max: hlib.getById('maxForm').value
  }
  const url = hlib.getById('urlForm').value
  if (url) {
    params.url = url
  }
  hlib.search(params, 'progress')
    .then( data => {
      processSearchResults(data[0], data[1])
    })
}

function processSearchResults(annos, replies) {
  hlib.getById('progress').remove()
  const rows = annos.concat(replies)
  const urls = {}
  const titles = {}
  rows.forEach(row => {
    const anno = hlib.parseAnnotation(row)
    if (! titles[anno.url]) {
      titles[anno.url] = anno.title
    }
    const users = urls[anno.url]
    if (users) {
      if (users.indexOf(anno.user) == -1) {
        users.push(anno.user)
        urls[anno.url] = users
      }
    } 
    else {
      urls[anno.url] = [anno.user]
    }
  })
  Object.keys(urls).forEach(url => {
    let html = `<p>${titles[url]}: `
    const users = urls[url]
    users.sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    })
    const userLinks = []
    users.forEach(user => {
      let userLink = `<a target="_contributor" href="${url}#annotations:query:user:${user}">${user}</a>`
      userLinks.push(userLink)  
    })
    html += userLinks.join(', ')    
    html += '</p>'
    appendViewer(html)
  })
}

function appendViewer(html) {
  hlib.getById('viewer').innerHTML += html
}

const tokenContainer = hlib.getById('tokenContainer')
hlib.createApiTokenInputForm(tokenContainer)
document.querySelector('#tokenContainer .clearInput').remove()

const groupContainer = hlib.getById('groupContainer')
hlib.createGroupInputForm(groupContainer)

const urlContainer = hlib.getById('urlContainer')
hlib.createFacetInputForm(urlContainer, 'url', '')
const urlForm = hlib.getById('urlForm')
urlForm.style.width = '40em'
const urlParam = hlib.gup('url')
if (urlParam) {
  urlForm.value = urlParam
}

const maxContainer = hlib.getById('maxContainer')
hlib.createFacetInputForm(maxContainer, 'max', '')
const maxClearInput = document.querySelector('#maxContainer .clearInput')
const maxForm = hlib.getById('maxForm')
maxForm.value = '500'
maxForm.style.width = '3em'

