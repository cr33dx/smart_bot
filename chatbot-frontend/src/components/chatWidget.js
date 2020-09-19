import React, {useState} from 'react'
import {Launcher} from 'react-chat-window-with-image-view'
import {sendMessage} from '../network/message'
import {ReactS3Client} from '../network/aws'
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
    let updatedName= Date.now().toString()
    const reponse= await ReactS3Client.uploadFile(fileList[0], updatedName)
    let imageMessage= {
      author: 'me',
      type: 'file',
      data: {
        url: reponse.location,
        fileName: 'name'
      }
    }
    messageList.push(imageMessage)
    const data={
      "sender": sender ,
      "message": reponse.location
    }
    sendMessageToServer(data)
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