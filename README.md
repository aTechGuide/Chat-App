## Chat App
Peer to Peer Messaging App build on NodeJS and Socket.io. Users can create/join a chat room for which others users are notified. Messages sent to a room aren't persisted to a database. 

## Live Preview
App is deployed on Heroku, you can access it using [this](https://rocky-gorge-40953.herokuapp.com/) link

## Developer Zone
### Message Event Format
``` socket.emit('createMessage', {from: 'kamran', text: 'This should emit!'}); ```

## References
- Styles [link](https://gist.github.com/andrewjmead/4783dec59ba2d1e5bcf3e1c301c5858d)
- GeoLocation APIs [link](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
- Templating Engine [mustache.js](https://github.com/janl/mustache.js/)
- Convert URL Query String to Object [link](https://gist.github.com/andrewjmead/b71e03d8df237983285892f9a265d401)