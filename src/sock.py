import tornado.websocket

clients=[]

class Handler(tornado.websocket.WebSocketHandler):

    async def open(self):
        for c in clients:
            await c.write_message("Someone entered the chat")
        clients.append(self)

    async def on_message(self, msg):
        for c in clients:
            await c.write_message(msg)


    async def on_close(self):
        for i in range(len(clients)):
            if clients[i] == self:
                del clients[i]
                break
        for c in clients:
            await c.write_message("Someone left the chat")

    def check_origin(self, *args):
        return True #Welcome Friend!