import React from "react";
import './styles/messenger.scss';

export class Message {
  MessageContent: string;
  MessageSent: boolean;
  MessageReply: string|undefined;
  constructor(MessageContent: string, Sent: boolean, ReplyTo?: string) {
    this.MessageContent = MessageContent;
    this.MessageSent = Sent;
    this.MessageReply = ReplyTo || undefined;
  }
};
export type MessengerProps = { Messages: Message[] };

export class MessageListState {
  StartTime: number;
  Time: number = 0;
  Messages: Message[] = [];
  Completed: boolean = false;

  constructor() {
    this.StartTime = Date.now()/1000;
  }
};

export class MessageListAction {
  Message: Message;
  Timestamp: number = 0;
  _Handled: boolean = false;
  
  constructor(Timestamp: number, Message: Message) {
    this.Timestamp = Timestamp;
    this.Message = Message;
  }
};

export function HandleMessageList(ListState: MessageListState|undefined, MessageListActions: MessageListAction[]): MessageListState {
  if (!ListState) {
    ListState = new MessageListState();
  }
 
  ListState.Time = ((Date.now()/1000) - ListState.StartTime)*1.0;
  
  let UnhandledTally = 0;
  MessageListActions.forEach(MessageAction => {
    if (MessageAction._Handled !== true) {
      UnhandledTally ++;
      if (ListState!.Time >= MessageAction.Timestamp) {
        ListState?.Messages.forEach((Message, index) => {
          if (Message.MessageContent === "TYPING") {
            delete ListState?.Messages[index];
          }
        })
        ListState!.Messages.push(MessageAction.Message);
        MessageAction._Handled = true;
      }
    } 
  });
  
  let NextMessageSent: boolean|null = null;
  for (let i = 0; i < MessageListActions.length; i++) {
    const MessageAction = MessageListActions[i];
    if (MessageAction._Handled === false) {
      NextMessageSent = MessageAction.Message.MessageSent;
      break;
    }    
  }

  if (NextMessageSent !== null && (ListState.Messages.length <= 0 || ListState.Messages[ListState.Messages.length-1].MessageContent !== "TYPING")) {
    ListState.Messages.push(new Message("TYPING", NextMessageSent));
  }
  
  if (UnhandledTally == 0) {
    ListState.Completed = true;
  }
  
  return ListState;
}

class Messenger extends React.Component<MessengerProps> {
  render() {
      return <div className="messenger-container">
        {
          this.props.Messages.map((message, index) => {
            if (message.MessageContent == "TYPING") {
              return <div key={24112} className={`${message.MessageSent ? 'message-typing-right' : ''} message-typing message-container`}><div className="l1"/><div className="l2"/><div className="l3"/></div>;
            }
            if (message.MessageReply !== undefined) {
              return <div key={index} className={message.MessageSent ? 'reply-c-right reply-c' : 'reply-c'}>
                  <div className="reply-ind">{message.MessageReply}</div>
                  <div className={`${message.MessageSent ? 'message-right' : ''} message-container`}>
                    <p className="message-content">{message.MessageContent}</p>
                  </div>
                </div>
            }
            return <div key={index} className={`${message.MessageSent ? 'message-right' : ''} message-container`}>
              <p className="message-content">{message.MessageContent}</p>
            </div>
          })
        }
      </div>
  }
};

export default Messenger;
