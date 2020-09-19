
export const sendMessage = async (data) => {
  const settings = {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      }
  };
  try {
      const fetchResponse = await fetch('http://165.22.209.216:5005/webhooks/rest/webhook', settings);
      console.log(fetchResponse)
      const data = await fetchResponse.json()
      console.log("this is data",data)
      if (typeof data !== 'undefined' && data.length > 0) {
        return data[0].text
      }
      else  {
        return "I am still learning to respond to this"
      }
     
  } catch (error) {
    console.log("error msg",error)
      return error;
  }    

}

