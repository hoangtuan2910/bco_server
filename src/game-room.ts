import { Client, Room } from "colyseus";
import { State,Player } from "./state";

export class GameRoom extends Room<State> {
    maxClients = 4;
    playerCount: number = 0;

    onInit(option){
        console.log('room created!');
    }

    onJoin(client: Client){
        console.log('client joined', client.sessionId);

        let player:Player = new Player();
        player.sessionId =  client.sessionId;
        player.seat =  this.playerCount++;

        this.state.players[client.sessionId] = player;
        this.playerCount++;

    }

    onLeave(client: Client){
        console.log('client left', client.sessionId);

        this.playerCount--;
    }

    onMessage(client: Client, message: any): void {
        console.log('message',message);

        if(!message) return;

        let player: Player =  this.state.players[client.sessionId];

        if(!player) return;

        let command: string = message['command'];
        
        switch(command){
            case 'rotate' :
                console.log('player' + player.seat + 'rotate')
                break;
            case 'shoot' :
                console.log('player' + player.seat + 'shoot')
                break;
        }

    }
}