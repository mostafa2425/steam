// let baseUrl = 'http://native-001-site2.ctempurl.com/api';
// export function getVendor (){
//     fetch(`${baseUrl}/GetVendors?Page=0`).then(function(response) {
//         if(response.ok) {
//           response.blob().then(function(myBlob) {
//             console.log(myBlob)
//           });
//         } else {
//           console.log('Network response was not ok.');
//         }
//       })
//       .catch(function(error) {
//         console.log('There has been a problem with your fetch operation: ' + error.message);
//       });
// }

export function getClubs (){
    fetch("http://native-001-site2.ctempurl.com/api/GetClubs?Page=0")
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            let clubs = data.model;
            // this.setState({ clubs, loading: false });
          });
        } else {
        //   message.error("Network response was not ok.");
        //   this.setState({ loading: false });
        }
      })
      .catch((error) => {
        // this.setState({ loading: false });
        // message.error(
        //   "There has been a problem with your fetch operation: " + error.message
        // );
      });
}