import axios from 'axios';

function updateData() {
    axios.put(`https://api.example.com/data/${selectedData.id}`, selectedData)
      .then(response => {
        const newData = data.map(item => {
          if (item.id === selectedData.id) {
            return response.data;
          }
          return item;
        });
        setData(newData);
        setSelectedData(null);
      })
      .catch(error => {
        console.log(error);
      })
  }
