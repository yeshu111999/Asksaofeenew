### Running Chat-UI
[Github repo](https://github.com/ksjpswaroop/immigpt_chat_ui)
You can easily run a local chat UI that uses the runpod api as follows:

Start by cloning chat-ui to your local machine (or a server):
```
git clone https://github.com/ksjpswaroop/immigpt_chat_ui.git
```
Then start a mongo database:
```
docker run -d -p 27017:27017 --name mongo-chatui mongo:latest
```
> Side-note: In the future, to restart mongo, use 'docker restart mongo-chatui'

Then
```
cd chat-ui
```
then
```
npm install
```

> Lastly, run chat-ui:
```
npm run dev
```

Now, open up the local host in your browser and start chatting!
