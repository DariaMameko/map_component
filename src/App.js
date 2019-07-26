import React from 'react';
import './App.css';

window.scriptEl = null;
window.onLoadLn = null;

class GoogleMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isAlreadyLoaded: false,
      onLoadLn: null,
      scriptEl: null,
      key111: 'AIzaSyDdYPWfbxsYt2Y0OVOcn9diQ6cVTOjRp-s'
    }
  }

  componentWillMount = () => {
    this.onLoadLn = this.applyMap.bind(this);
    const {google} = window;

  }

  componentDidMount = () => {
    if (this.state.isAlreadyLoaded) {
      this.applyMap();
      return;
    } else {
      this.scriptEl = document.createElement("script");
      this.scriptEl.type = 'text/javascript';
      this.scriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${this.state.key111}`;
      this.scriptEl.addEventListener("load", this.onLoadLn);
      document.head.appendChild(this.scriptEl);
    }
  }

  componentWillUnmount = () => {
    if (this.scriptEl) {
      this.scriptEl.removeEventListener("load", this.onLoadLn);
      console.log(this.onLoadLn);
    }
  }

  applyMap = () => {
    const {google} = window;
    var coordinates = {lat: 50.4305641, lng: 30.485075},
    popupContent = '<p class="content" id="content">Что угодно</p>',
    zoom = 15,

    map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: zoom,
        styles: [
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#e9e9e9"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#f5f5f5"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 29
                  },
                  {
                      "weight": 0.2
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 18
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#f5f5f5"
                  },
                  {
                      "lightness": 21
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#dedede"
                  },
                  {
                      "lightness": 21
                  }
              ]
          },
          {
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "saturation": 36
                  },
                  {
                      "color": "#333333"
                  },
                  {
                      "lightness": 40
                  }
              ]
          },
          {
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#f2f2f2"
                  },
                  {
                      "lightness": 19
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#fefefe"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#fefefe"
                  },
                  {
                      "lightness": 17
                  },
                  {
                      "weight": 1.2
                  }
              ]
          }
      ],
        disableDefaultUI: true
    }),

    infowindow = new google.maps.InfoWindow({
        content: popupContent
    }),

    marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      icon: {
        url: "https://png.icons8.com/marker",
        scaledSize: new google.maps.Size(48, 48),
      }
    });

    google.maps.event.addListener(infowindow,'closeclick',function(){
      marker.setIcon('https://png.icons8.com/marker');
      marker.setVisible(true);
      
    });

    marker.addListener('click', function () {
      marker.setVisible(false);
      infowindow.close(map, marker);
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

		this.setState({isAlreadyLoaded: true});
  }

  render() {
    return (
      <div id='map' className='google-map'>

      </div>
    )
  }
}

export default GoogleMap;
