import axios from 'axios';

function deleteData(id) {
    axios.delete(`https://api.example.com/data/${id}`)
      .then(() => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
      })
      .catch(error => {
        console.log(error);
      })
  }
