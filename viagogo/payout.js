function createElement(tag, text) {
     if (text == null) {
          text = "";
     }

     var temp = `<${tag}>${text}</${tag}>`;
     if (tag == "br") {
          var temp = `<br>`;     
     }

     var a = document.createElement(tag);
     a.innerHTML = temp;
     return a.childNodes[0];     
}

function waitForElm(selector) {
     return new Promise(resolve => {
         if (document.querySelector(selector)) {
             return resolve(document.querySelector(selector));
         }
 
         const observer = new MutationObserver(mutations => {
             if (document.querySelector(selector)) {
                 resolve(document.querySelector(selector));
                 observer.disconnect();
             }
         });
 
         observer.observe(document.body, {
             childList: true,
             subtree: true
         });
     });
}

function insert_payout(ticket_ammount) {
     prices = document.querySelectorAll('span[class="t-b fs16"]');
     if (prices.length == 0) {
          prices = document.querySelectorAll('span[class="t xs fs16"]');          
     }

     prices.forEach(element => {
          var currency = element.textContent.trim()
          var currency = currency.charAt(0);
          console.log(currency)
          var total = parseInt(element.textContent.trim().replace(currency, "").replace(",", ""))
          var new_total = Math.round(Math.round(total * 0.8182) * 0.88) + 10
          element.appendChild(createElement("br"))
          element.appendChild(createElement("p1", `Payout: ${currency}${new_total}`))

          if (ticket_ammount != 1) {
               var total_payout = new_total * ticket_ammount
               element.appendChild(createElement("br"))
               element.appendChild(createElement("p1", `Total Payout: ${currency}${total_payout}`))
          }
          //console.log(`£${new_total}`)
     });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function user_actions() {
     var window_location = window.location.toString() 
     var ammount = document.querySelectorAll('button[class="press  btn-obv w100"]'); 
     var seat_options = Array.from(document.querySelectorAll('div[data-mapsection]'));
     var seat_options2 = Array.from(document.querySelectorAll('input[data-name]'));
     var next_btn = document.querySelector('li[class="js-next "]') 
     var prev_btn = document.querySelector('li[class="js-prev disabled"]')
     var price_btn = document.querySelectorAll('span[class="js-color-code-bucket mbxxs pointer inm uuxxs"]'); 
     var map = document.querySelector('div[id="svgMapContainer"]');
     var additional_tickets = document.querySelector('select[id="js-dropdown-quantityFilter"]')  

     if (window_location.includes("?qty=")) {
          var new_url = window_location.split("?")[0] 
          window.open(new_url)
          window.close(window_location)
     }
     
     ammount.forEach(element => {
          element.addEventListener('click', async(event) => {
               ticket_ammount = parseInt(element.textContent.replace("Tickets", ""))
               await sleep(1500)
               insert_payout(ticket_ammount)
          })
     })

     if (seat_options != null) {
          seat_options.forEach(element => {
               if (element.className.includes("radius")) {
                    element.addEventListener('click', async(event) => {
                         var selected_ammount = document.querySelector('button[class="press  btn-obv w100 sel"]');
                         ticket_ammount = parseInt(selected_ammount.textContent.replace("Tickets", ""))
                         await sleep(1700)
                         insert_payout(ticket_ammount) 
                    })
               }
          });
     }

     if (seat_options2 != null) {
          seat_options2.forEach(element => {
               
               element.addEventListener('click', async(event) => {
                    var selected_ammount = document.querySelector('button[class="press  btn-obv w100 sel"]');
                    ticket_ammount = parseInt(selected_ammount.textContent.replace("Tickets", ""))
                    await sleep(1700)
                    insert_payout(ticket_ammount) 
               })
               
          });
     }

     if (next_btn != null) {
          next_btn.addEventListener('click', async(event) => {
               var selected_ammount = document.querySelector('button[class="press  btn-obv w100 sel"]');
               ticket_ammount = parseInt(selected_ammount.textContent.replace("Tickets", ""))
               await sleep(1500)
               insert_payout(ticket_ammount)
          })
     }

     if (prev_btn != null) {
          prev_btn.addEventListener('click', async(event) => {
               var selected_ammount = document.querySelector('button[class="press  btn-obv w100 sel"]');
               ticket_ammount = parseInt(selected_ammount.textContent.replace("Tickets", ""))
               await sleep(1500)
               insert_payout(ticket_ammount)
          })
     }

     if (price_btn != null) {
          price_btn.forEach(element => {
               element.addEventListener('click', async(event) => {
                    var selected_ammount = document.querySelector('button[class="press  btn-obv w100 sel"]');
                    ticket_ammount = parseInt(selected_ammount.textContent.replace("Tickets", ""))
                    await sleep(1500)
                    insert_payout(ticket_ammount) 
               })
          })
     }

     if (map != null) {
          waitForElm('g[cursor="pointer"]').then((elm) => {
               var available_sections = document.querySelectorAll('g[cursor="pointer"]')
               if (available_sections.length == 0) {
                    var available_sections = document.querySelectorAll('g[data-original-title]')     
               }

               available_sections.forEach(element => { 
                    if (element != null) {
                         element.addEventListener('click', async(event) => {
                              var selected_ammount = document.querySelector('button[class="press  btn-obv w100 sel"]');
                              ticket_ammount = parseInt(selected_ammount.textContent.replace("Tickets", ""))
                              await sleep(1500)
                              insert_payout(ticket_ammount) 
                         })  
                    }          
                    
               })
          });
                 
     }

     if (additional_tickets != null) {
          additional_tickets.addEventListener('change', async(event) => {
               await sleep(1500)
               insert_payout(1) 
          })
     }
}

function main() {
     chrome.storage.local.get("onOrOff" , result => {
          if (result.onOrOff == true) {
               user_actions() 
          }  
     })      
};

main()