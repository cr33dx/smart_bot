import React, {useState} from 'react'
import {Launcher} from 'react-chat-window'
import {sendMessage, postFormData} from '../network/message'

const sender = Date.now().toString()

const Demo = () =>{
  const [messageList, setMessageList] = useState([])
  
  const onMessageWasSent = async(message) => {
    console.log(message)
    messageList.push(message)
    const data={
      "sender": sender ,
      "message": message.data.text
    }
    sendMessageToServer(data)
  }
 
  const sendMessageToServer= async(data) => {
    console.log(JSON.stringify(data))
    const response = await sendMessage(data)
    let responseMessage= {
      author: 'them',
      type: 'text',
      data: {
        text: response
      }
    }
    setMessageList([...messageList, responseMessage])
  }
  
  const onFilesSelected = async(fileList) =>{
    console.log(fileList[0])
    const formData = new FormData();
    formData.append("message", fileList[0]);
    formData.append("sender", sender)
    postFormData(formData)

  }
    return (<div>
      <Launcher
        agentProfile={{
          teamName: 'Bearopedia',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={onMessageWasSent}
        messageList={messageList}
        onFilesSelected= {onFilesSelected}
      />
    </div>)
  }


export default Demo