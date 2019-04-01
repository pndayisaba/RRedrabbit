/**
 * Required Scripts:
 *    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
 *    <script src="https://cdnjs.cloudflare.com/ajax/libs/superagent/3.3.1/superagent.min.js"></script>
 */

const Request = window.superagent;

class ReactTest extends React.Component {

  constructor(props) {
    super(props);
    this.requestWeather = this.requestWeather.bind(this);
    
    console.log("IT'S WORKING...8");
    const consumerKey = 'dj0yJmk9UWI2MUtIM3hKYnJHJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTkz';
    const requestConf = {
       url: 'https://weather-ydn-yql.media.yahoo.com/forecastrss',
       method: 'GET',
       app_id: 'OqFmGl7k',
       consumer_key: 'dj0yJmk9UWI2MUtIM3hKYnJHJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTkz',
       consumer_secret: 'b213fdb78696ca4e75fa1fe734688d495ef8b399',
       oauth: {
          'oauth_consumer_key': consumerKey,
          'oauth_nonce': Math.random().toString(36).substring(2),
          'oauth_signature_method': 'HMAC-SHA1',
          'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
          'oauth_version': '1.0'
        },
        //locationCities: ['toronto,on', 'ottawa,on', 'edmonton,ab']
        locationCities: {'toronto,on': null, 'ottawa,on': null, 'edmonton,ab': null}
     }
      
     /*const merged = {...requestConf.query, ...requestConf.oauth}; 
     const mergedArr = Object.keys(merged).sort().map((ky) => {
       return [ky + '=' + encodeURIComponent(merged[ky])];
     });
     
      const concat = '&';
      const signature_base_str = requestConf.method
      + concat + encodeURIComponent(requestConf.url)
      + concat + encodeURIComponent(mergedArr.join(concat));
      
      requestConf.composite_key = encodeURIComponent(requestConf.consumer_secret) + concat;
      requestConf.hash = CryptoJS.HmacSHA1(signature_base_str, requestConf.composite_key);
      requestConf.oauth['oauth_signature'] = requestConf.hash.toString(CryptoJS.enc.Base64);
    
      requestConf['auth_header'] = 'OAuth ' + Object.keys(requestConf.oauth).map((ky) => {
        return [ky + '="' + requestConf.oauth[ky] + '"'];
      }).join(',');*/
    
      this.state = requestConf;
  }
  
  requestWeather(weatherLocation) {
    const requestConf = { 
        oauth: this.state.oauth,
        query: {'location': weatherLocation, 'format': 'json'},
        mergedArr: [ ]
     };
    //this.state.locationCities.map((loc) => {
       const merged = {...requestConf.query, ...requestConf.oauth};
       requestConf.mergedArr = Object.keys(merged).sort().map((ky) => {
       return [ky + '=' + encodeURIComponent(merged[ky])];
       });
    
     
      const concat = '&';
      const signature_base_str = this.state.method
      + concat + encodeURIComponent(this.state.url)
      + concat + encodeURIComponent(requestConf.mergedArr.join(concat));
      
      requestConf.composite_key = encodeURIComponent(this.state.consumer_secret) + concat;
      requestConf.hash = CryptoJS.HmacSHA1(signature_base_str, requestConf.composite_key);
      requestConf.oauth['oauth_signature'] = requestConf.hash.toString(CryptoJS.enc.Base64);
    
      requestConf.auth_header = 'OAuth ' + Object.keys(requestConf.oauth).map((ky) => {
        return [ky + '=\u0022' + requestConf.oauth[ky] +'\u0022'];
      }).join(',');
      
      console.log("RequestWeather() 7899 ENDING: ", requestConf.auth_header);
    return requestConf;
    //});
  }
  
  componentDidMount() {
    console.log("DID MOUINT 66");
    const locationCities = this.state.locationCities;
    Object.keys(locationCities).map((value, ky) => {
      console.log("value: "+value+", -- ky: "+ky);
      const requestConf = this.requestWeather(value);
       console.log("moving on...")
      Request
        .get(this.state.url)
        .query(requestConf.query)
        .set({'Authorization': requestConf.auth_header, 'X-Yahoo-App-Id': this.state.app_id})
        .then((response) => {
           if(response && typeof response === 'object')
            {
              console.log("FETCH DONE... 84485 04: ");
              for(let rName in response)
                {
                  console.log("rName: ", rName);
                }
            }
           else
             console.log("RESPONSE EMPTY");
          console.log(response.forecasts);
          locationCities[value] = response;
      });
    });
    console.log("AAA toronto,on: ", locationCities['toronto,on']);
    this.setState({locationCities})
  }

  render() {
    console.log("RENDERING 0090");
    return (
      <div className="ldldkd">{8 / 2} = -fgfgf</div>
    );
  }

}

ReactDOM.render(<ReactTest />, document.getElementById('container'));
