import axios from 'axios';

function addDat() {
    axios.post('https://api.example.com/data', newData)
      .then(response => {
        setData([...data, response.data]);
        setNewData({ name: '' });
      })
      .catch(error => {
        console.log(error);
      })
  }