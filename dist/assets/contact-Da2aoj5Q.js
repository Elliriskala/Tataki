import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css            */const g=document.getElementById("getLocation"),T=document.getElementById("itineraryForm"),S=document.getElementById("itineraryResults");let e=localStorage.getItem("language")||"en";const n={en:{itinerary:"Itinerary",duration:"Duration",mode:"Mode",line:"Line",from:"From","stop-name":"Stop Name","stop-code":"Stop Code",to:"To","start-time":"Start Time","end-time":"End Time",distance:"Distance",meters:"meters","User Location":"User Location",hours:"hours",minutes:"minutes",seconds:"seconds"},fi:{itinerary:"Reitti",duration:"Kesto",mode:"Liikkumistapa",line:"Linja",from:"Lähtö","stop-name":"Pysäkin Nimi","stop-code":"Pysäkin Koodi",to:"Määränpää","start-time":"Aloitusaika","end-time":"Lopetusaika",distance:"Etäisyys",meters:"metriä","User Location":"Käyttäjän sijainti",hours:"tuntia",minutes:"minuuttia",seconds:"sekuntia"}},L="",E={enableHighAccuracy:!0,timeout:5e3,maximumAge:0};g.addEventListener("click",()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(async function(r){const o=r.coords.latitude,a=r.coords.longitude;document.getElementById("fromLat").value=o,document.getElementById("fromLon").value=a,g.style.display="none",T.style.display="block"},r=>{alert("Error retrieving location: "+r.message)},E):alert("Geolocation failed. Try switching your broweser or refresh the page.")});T.addEventListener("submit",async r=>{r.preventDefault(),console.log(L);const o=document.getElementById("fromLat").value,a=document.getElementById("fromLon").value,i=60.1699,s=24.9384,m=1,d=document.getElementById("walkSpeed").value,t=n[e]["User Location"];try{const c=await(await fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{method:"POST",headers:{"Content-Type":"application/json","digitransit-subscription-key":L},body:JSON.stringify({query:`
          query {
            plan(
              fromPlace: "${t}::${o},${a}",
              toPlace: "Tataki, Helsinki::${i},${s}",
              numItineraries: ${m},
              transportModes: [{mode: BUS}, {mode: RAIL}, {mode: TRAM}, {mode: FERRY}, {mode: WALK}],
              walkReluctance: 2.1,
              minTransferTime: 600,
              walkSpeed: ${d}
            ) {
              itineraries {
                walkDistance
                duration
                legs {
                  mode
                  startTime
                  endTime
                  from {
                    lat
                    lon
                    name
                    stop {
                      code
                      name
                    }
                  }
                  to {
                    lat
                    lon
                    name
                    stop {
                      code
                      name
                    }
                  }
                  trip {
                    tripHeadsign
                    routeShortName
                  }
                  distance
                  legGeometry {
                    length
                    points
                  }
                }
              }
            }
          }
        `})})).json();c.data&&c.data.plan&&c.data.plan.itineraries?(k(c.data.plan.itineraries),S.style.display="block"):alert("No itineraries found. Please try again.")}catch(u){console.error("Error fetching itinerary data:",u),alert("There was an error fetching the itinerary.")}});function k(r){const o=document.getElementById("itineraryList");o.innerHTML="",r.forEach((a,i)=>{const s=document.createElement("li"),m=R(a.duration),d={fi:{WALK:"Kävely",RAIL:"Juna",BUS:"Linja-auto",TRAM:"Raitiovaunu",FERRY:"Laiva"},en:{WALK:"Walking",RAIL:"Train",BUS:"Bus",TRAM:"Tram",FERRY:"Ferry"}};s.innerHTML=`
            <h3>${n[e].itinerary} ${i+1}</h3>
            <p><strong>${n[e].duration}:</strong> ${m}</p>
            <ul>
                ${a.legs.map(t=>{var u,c,l,$,p,f,y;return`
                    <li>
                        ${t.mode?`<strong>${n[e].mode}:</strong> ${d[e][t.mode]||t.mode} ${(u=t.trip)!=null&&u.tripHeadsign?`(${n[e].line}: ${t.trip.tripHeadsign} ${t.trip.routeShortName||""})`:""} <br>`:""}
                        ${(c=t.from)!=null&&c.name?`<strong>${n[e].from}:</strong> ${t.from.name} (${t.from.lat}, ${t.from.lon})<br>`:""}
                        ${($=(l=t.from)==null?void 0:l.stop)!=null&&$.name?`<strong>${n[e]["stop-name"]}:</strong> ${t.from.stop.name} <br>`:""}
                        ${(f=(p=t.from)==null?void 0:p.stop)!=null&&f.code?`<strong>${n[e]["stop-code"]}:</strong> ${t.from.stop.code} <br>`:""}<br>
                        ${(y=t.to)!=null&&y.name?`<strong>${n[e].to}:</strong> ${t.to.name} (${t.to.lat}, ${t.to.lon})<br>`:""}
                        ${t.startTime?`<strong>${n[e]["start-time"]}:</strong> ${h(t.startTime)} <br>`:""}
                        ${t.endTime?`<strong>${n[e]["end-time"]}:</strong> ${h(t.endTime)} <br>`:""}
                        ${typeof t.distance=="number"?`<strong>${n[e].distance}:</strong> ${t.distance.toFixed(0)} ${n[e].meters} <br>`:""}
                    </li>
                `}).join("")}
            </ul>
        `,o.appendChild(s)})}function R(r){const o=Math.floor(r/3600),a=Math.floor(r%3600/60),i=r%60,s=o>0?`${o} ${n[e].hours} `:"",m=a>0?`${a} ${n[e].minutes} `:"",d=i>0?`${i} ${n[e].seconds}`:"";return`${s}${m}${d}`.trim()}function h(r){const o=new Date(r);if(e==="fi"){const a=o.getHours().toString().padStart(2,"0"),i=o.getMinutes().toString().padStart(2,"0"),s=o.getSeconds().toString().padStart(2,"0"),m=`${a}:${i}:${s}`;return`${o.toLocaleDateString("fi-FI")}, ${m}`}else{const a=o.toLocaleTimeString();return`${o.toLocaleDateString()}, ${a}`}}
