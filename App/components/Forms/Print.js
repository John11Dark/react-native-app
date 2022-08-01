import { printAsync, printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const generatePdf = (data) => {
  let counter = 0;
  const html = `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@700&display=swap"
        rel="stylesheet"
      />
  
      <!-- Styles -->
      <style>
        :root {
          --primaryColor: #50bed2;
          --primaryColorDark: #1e2931;
          --primaryColorLight: #edeee4;
          --primaryColorLightGray: #fff;
          --primaryColorDarkGray: #7c8688;
          --primaryColorDarkOpacity: #29319a;
          --secondaryColor: #e6b11e;
          --TertiaryColor: #00b5a9;
          --lineColor: #edeee4;
          --darkCardBackgroundColor: #10191e;
          --lightCardBackgroundColor: #f3f3f3;
          --importantIconColor: #ee3e1f;
          --barBackgroundColor: #0a1a26;
        }
  
        * {
          outline: none;
          padding: 0;
          margin: 0;
        }
  
        html {
          background-color: var(--primaryColorLight);
        }
  
        body {
          font-family: "Quicksand", sans-serif;
          font-size: 1rem;
          background-color: #fff;
          width: 100vw, 100%;
          display: grid;
          line-height: 2;
          color: var(--primaryColorDark);
          padding: 0 3rem;
        }
  
        header {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          padding: 1em 1em 0 0;
          margin: 1rem 0 0 0;
        }
  
        /*.logoContinuer {
          display: flex;
          width: 50%;
          align-items: center;
          justify-content: flex-start;
        }*/
  
        .Logo {
          width: 600px;
          height: 400px;
          objectFit: contain
        }
        .logoTitle {
          font-size: 2rem;
          transform: translate(-4%, -5%);
          font-family: "Pacifico", cursive !important;
          color: var(--barBackgroundColor);
        }
  
        .companyDetails {
          display: grid;
          justify-content: flex-start;
          align-items: center;
          gap: 1rem;
        }
        .svgIcon {
          max-width: 25px;
          max-height: 25px;
          fill: var(--secondaryColor);
        }
        .margin {
          margin-right: 0.75rem;
        }
  
        .containerDetails {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 1rem;
          padding: 0.2rem;
          margin: 0.25rem;
        }
        .spanDetails {
          font-size: 1rem;
          font-weight: 600;
          color: var(--primaryColorDark);
        }
        .heroSection {
          grid-row: 1;
          grid-column: 1 / span 2;
        }
        .title {
          text-align: center;
          font-size: 2.2rem;
          font-weight: bold;
          color: var(--secondaryColor);
        }
  
        .date {
          text-align: center;
          font-weight: 400;
          font-size: larger;
          color: var(--primaryColorDarkGray);
        }
  
        .leftColumn {
          grid-column: 1;
          grid-row: 2;
        }
  
        .rightColumn {
          grid-column: 2;
          grid-row: 2;
        }
        .contentContainer {

          align-self: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          gap: 1rem;
          display: grid;
          grid-template-columns: 50% 40%;
        }
  
        .box {
          display: grid;
          align-items: center;
          gap: 1rem 0;
          width: 520px;
          margin-block: 1em;
          padding: 1rem;
          grid-column: 1;
        }
        .ClientDetails{
          alignContent: 'flex-start',
          alignItems: 'flex-start',
        }
        .poolRequiredOptions {
          grid-row: 2;
          grid-column: 2;
        }
        .containerTitle {
          font-size: 1.5rem;
          position: relative;
        }
        .containerTitleAfter {
          background-color: var(--secondaryColor);
          height: 3.5px;
          width: 100%;
          border-radius: 25rem;
        }
  
        .details {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 0.5rem;
        }
  
        .filedLabel {
          font-size: 1.3rem;
          color: var(--primaryColorDark);
          min-width: 240px;
        }
  
        .filedValue {
          font-size: 1rem;
          font-weight: 500;
          color: var(--primaryColorDarkGray);
          border: 1.5px solid var(--primaryColorDarkGray);
          padding: 0.75rem;
          border-radius: 0.25rem;
        }
        .ClientDetails .filedValue {
          min-width: 250px;
        }
        .Number {
          width: 100px !important;
          text-align: center;
        }
  
        .detailsBox {
          width: 250px;
          background-color: #e6b11e88;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          min-height: 100px;
        }
        .filedValueBox {
          padding-left: 0.25rem;
          color: var(--TertiaryColor);
        }
  
        .PriceBox {
          transform: translate(0, 100%);
          width: 300px;
          padding-bottom: 2em;
        }
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          border-radius: 0.5rem;
          width: 80%;
          color: var(--primaryColorDark);
        }
  
        td,
        th {
          border: 2px solid #797058;
          text-align: left;
          padding: 8px;
          font-size: 1.2rem;
        }
  
        tr:nth-child(odd) {
          background-color: #cac6b5d0;
        }

        .imagesContainer {
          width: "90%";
          height: 300px;
          transform: translate(0%, 50%);
          display: flex;
          gap: 0.5rem;
          align-items: center;
          justify-content: center;
          alignContent: center
        }
  
        .image {
          background-color: #00b5a9;
          width: 32.5%;
          height: 90%;
          border-radius: 1rem;
        }
  
        .extraRemarks {
          height: 200px;
          transform: translate(0%, 100%);
          display: grid;
          align-items: center;
        }
  
        .label {
          font-size: 1.5rem;
        }
  
        #extraRemarksBox {
          padding: 1rem;
          background-color: #fcf6ef;
          font-size: 1rem;
          margin-top: 5rem;
          width: 70%;
          color: #10191e;
          font-weight: 600;
          font-family: "Quicksand", sans-serif;
          text-align: left;
          border: 1px solid #cac6b5d0;
          border-radius: 0.5rem;
        }

      </style>
      <title>${data.title}</title>
    </head>
    <body>
      <!-- Header -->
      <header>
        <!-- Logo  Continuer-->
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="Logo"  width="178" height="57" viewBox="0 0 178 57">
        <defs>
          <pattern id="pattern" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 283 90">
            <image width="283" height="90" xlink:href="data:image/png;base64,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"/>
          </pattern>
        </defs>
        <rect id="logo" width="178" height="57" fill="url(#pattern)"/>
      </svg>
      
  
        <!-- Company details  -->
        <section class="companyDetails">
          <div class="containerDetails">
          <svg class="svgIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="33" height="27" viewBox="0 0 33 27">
          <image  id="Icon_material-email" data-name="Icon material-email" width="33" height="27" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAbCAYAAADyBeakAAAABHNCSVQICAgIfAhkiAAAAiZJREFUSEvtln8yw1AQx3dfmdEZpf4xWoQbcAMcgLYn0J5AnUCcQHsCdYImXIATqBsYtDX+UT8GM8Zb+xqRtE0kQjr+8P7LvPd2v/nuZ5NF4NUytS0iKCLCsnoexuJ8DUzQbnb90sDWoVYGgr1hJPbKgVKuYdPQTofpwKAQMpFLQc4GHQBhHhAmY3OG4A6QGgC4YuWgkx4RypoxeGw8i1SND+V+X4isJuWj/iQmygiw4ysiU7g6Vpvt+twqoaixKws/FUNAZ0JS2Y7dNDXdXwRSKbNxyS5Y67aeTj+LcR1AbEUSwtYTQmU2d8ExnNU05vcRsejphFUiMpL0UJoqdDr2tZv67PKrEDUEXAovhmstX4uZwvW5faddn1kkHN0HxFUnTh8T9gb3cIc7Rs/mLqrupN12lqB/Ca4CL0FF1f/uu21T2+EO6HHE3wn3TaLjEZLb04Um02yt7tuI0Yo3uBZ4bhc/2OK3h0VvF32c6D/MEOlj8r7qDt46ms/DG1YUuP3gqfuKpydM7Tm19ytkSBEWK3COJEs24Xail0Qq74a565apbUqCCpc0HczQd0Q4wAyA+zV4QTKiiFCmeIDrD15MIj7DMrhc8xqLUh3jA17cIoLih9qPWI5QsUMf+hfx2W69v/LQDv7qwf9y/LlyGFon1pkykJ8uE3P8W444OQUmCD6APM2hNcLFNdgGiZDVbO5KDb3WUsMKwEjE739QssF9NdXb88k7Q1UyG+Njen4AAAAASUVORK5CYII="/>
        </svg>
        
            <span class="spanDetails">info@dolphinpools.com.mt</span>
          </div>
  
          <div class="containerDetails">
          <svg class="svgIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40">
          <image id="Icon_awesome-link" data-name="Icon awesome-link" width="40" height="40" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABHNCSVQICAgIfAhkiAAABDpJREFUWEe1mF1SE0EQx6c3QAlVIL5YkpAYTmA4gckBJMkJCCcQTwCeQDwBcILs6gGIJzCegJBIsHwhgqVVaKbtmWTWYXdmP5IlDxSE3Z7fdP/7YwbYA36+twuVv46zy5BVkEEFgK3L5RA7yFiPOcwt7Ay8KAR4CL6r9mYVAQ4YQDXWPrIegR9u1PunpmczB7zySgfkncNYsOADiO4y3u49aY5G+r8yBbx0i8cA0EoNN30BkXVX8KamQ2YGOC+cvynSZ74xqKm/MwHMDE55krG3hXpfymRuwGRw/D1w5iqvYM6pME46BfbYJAcK9YhCvSVCPRdgHBwy/LLIeetp87IbBLlur6//dlYJGl4aNQvsTX6nfzQzYBK4FX5bDWalDiMhYa1LnnweTmrWLTT62zMBDr3NI8ac17ZsFZ6Lg1PvDj8WG4xD22QrX+9TiUz5iTIom0QKOB/SK1HpDH+A81p6QLd0TiEpG8U9A5ywc+mWrv02qBlODXj1odhChOMkcKIPj9l4tNH81osL0jArDw69osi6emhBZD8WcFxV2aoSSJQLyOFe/tXALzHBdycDRe6zaRPL/OZJqhDbQkEC8gurMYEcbNogh26xTUNFw7Dpi3yjX04FaA/F3ZYIpZxiHOfMUDJGiziuBethlGQo3U7z9UHLCkjhfEcpWVYThm1xASPKgRS7VzqkXw6Mmgv02Gg4xhb4eFtsyAioF2EA3NvYGZxctZ+V0Vk6t9Ur8X1cCWJaqMkBHWsXmXpP2AwBBjvEfX2Z65XarTAYE7ZPFLaq3IxXPKHld00Jt4w3ZdWB7gGa29dEC9KoW+qZ2pLSi1osKtQiM8Xito3om73nQatRGskpm7Ymu7a3OCUF8dxkEFi7NslBFN+N5teOSdO6DfWu9GBUAshdcJWldh3K56Z6nYbQqDGbpk1wvgepFp3ZDjiitxbqg4rakVU79ID+rC0JdE1fesUuIJTBwX2RiEaPR1VyWvGCBFvRRyaZzbAkRiTDsIke6VUWXRugzVMmOOnBKF0FBauMGCVB7Q7wriIKdhIN2oCC3xOgrR79z16TMZmFHI6kJwO9OGrTKosTA9r6q15UbcaEPP44ucYiH7uqjcXUQV8CiQGjRh1RDpIaktUgYhybVINJiUljk0Jsn2bTGIuDoxz3u0hKQLMG9XIQZzAWTkugOFumJKH6E+6J+tk0ymgs3IyhVWtC5ARiudDxy02M5qTutO6S1nvyffHDPgTQP6kXI1V6/R5PFndwxPVaeBLWKOaF8wGThEmuS7C2E11IO3N6zg+x+sV6IJohLll4LgQo2tMvZ7UDDF7MwOS/kiWcH2JlPfZCJ4o80O7m2aT+rvlMIg4/yPZt12PhxfF0md/uR10UzQpsPdVJb+bW6CYB6ehnCDuNYgyws8D5kel6bVagULIlNSRGLPXsI/az+xDeMrH8AzDTt9sttqTKAAAAAElFTkSuQmCC"/>
        </svg>
        
            <span class="spanDetails">www.dolphinpools.com.mt</span>
          </div>
  
          <div class="containerDetails">
          <svg class="svgIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32">
  <image id="Icon_ionic-ios-call" data-name="Icon ionic-ios-call" width="32" height="32" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAnRJREFUWEe9l39y0kAUx/cF6AzOOLb/OJJKrCeQnkA5gEJO0PYG9QTQE1hPYDxBoF4ATyCeoBRacPzHDP3DGZV9vt0hIQyb7IIb96/M5O3bT96P774AS63v4WHjDzgdBtAGwLPam0mQfl/EM8ROp/36O8bgPH3I/4CQANNePRRfrfrCMl8cP/bvhkV8vfAJd32vSxSdzAOQjao4Pz7wo6gICJj2vGsG7CjPOTJ2cdgad4sB6HvkX7+A/3pe87+N9JbbWYgIRBSBR/pt+NFtTU71dttZAFV/j0qhZbKtyucHtmsBZlf1U0T4YAIAnDdr/u3AxNbUZtmGBmlAduO2x7nFanromtZIHbjyzhkyEqLsVZQerJSw542oGJ+pEYopQHHWCuBTvc04hCqAQnUgfSB1BBUYvNyAQBy47Ulzlxzr9iQREIaz8MkROnvXyk0O+u7rCbWs3bUGIFxn3Q2ILKrgomn7YtoAkF2RkQqCGD7AedOmGCkBZCpgb6iSaNsQSgARBTkdOaUvyq6wGIlMAFmUOTJtKxK5AFqVpGGljAtfVZgijbxUeeEsfn/Nu8a1AMuiDEgfTjLSEQGwrtsav4/fz/peh8Srm9iTjpSRv1WBGgHoIORBFA0CCTgymqhZQ60WeFnl9xfpLjIG0NWEsTwJUORn8bW+FYA1CHIUj/xbAyQtCqWB2SiXHRsBsROAcPkj3N//6TwU49zm5WWej887A8RnyGGGU8UbDbbrZOKa/2cAWRfyFq1cmg63y665oR+ehhWApP/Dp68QnCB7slpFIB5wrQIkIELCOYi0KEe89E9vIQBrEXEY/fRCLEwj4BikR/u/u/EVrDuPFdQAAAAASUVORK5CYII="/>
</svg>

            <span>(+356) 2123 0855</span>
          </div>
          <div class="containerDetails">

          <svg class="svgIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23" height="37" viewBox="0 0 23 37">
          <image id="Icon_awesome-mobile-alt" data-name="Icon awesome-mobile-alt" width="23" height="37" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAlCAYAAACpmHIGAAAABHNCSVQICAgIfAhkiAAAAVJJREFUSEvtls1NAkEUx///NeHgRb0JZJEOpAOxAAPbASVoBWAHdqAdwGoDawfYAYqA8YQe/ZjHm8QlWYPOBLyYzNw2ee83+z6y+yP0TG/itnyyS6Jhnzc5IhhGYs7KyWNGC4ZhfxPgqlwac8xJGg8JHv41HJBbTtOa5GCB3AEcrHsRBacgdvL8b3CcV1sPvXXhk7TWI9AN8EIHQ1tWLlRoS2iL/5cmbEvYlrAt+K8/aAhGqnRX/iMsRhr1Fs3fXakW60J/yitIkRMuuFejOnDGfQV4wa3mRea9XU6eRrP+fl1Yynwu8YIjkqRyMl465Ow67ojw0lWBF9zqsPXtHOar3V5wiAwq7XGyhKexXsSjX99c56PwWMtly1WiXVPtfaYu39R+153xkJTP/Wrjg1t2QEuvdic6IgQvlLeG6jRgN8BEpQ4hzU3BAmbb5vViL5nPF4/LQHkFfys2AAAAAElFTkSuQmCC"/>
        </svg>
        
            <span class="spanDetails">(+356) 7942 8981</span>
          </div>
  
          <!-- <div class="containerDetails">
            <svg class="svgIcon margin" viewBox="8.355 1.928 8.392 13.427">
              <path
                id="Icon_metro-location"
                d="M 12.55064105987549 1.928033471107483 C 10.23333072662354 1.928033471107483 8.354801177978516 3.806563138961792 8.354801177978516 6.123873233795166 C 8.354801177978516 10.31971263885498 12.55064105987549 15.3547191619873 12.55064105987549 15.3547191619873 C 12.55064105987549 15.3547191619873 16.74647903442383 10.31971263885498 16.74647903442383 6.123873233795166 C 16.74647903442383 3.806563377380371 14.86792469024658 1.928033590316772 12.55064105987549 1.928033590316772 Z M 12.55064105987549 8.693825721740723 C 11.13129329681396 8.693825721740723 9.98068904876709 7.543220520019531 9.98068904876709 6.123873233795166 C 9.98068904876709 4.704525470733643 11.13129329681396 3.553921461105347 12.55064105987549 3.553921461105347 C 13.9699878692627 3.553921461105347 15.12059211730957 4.704525470733643 15.12059211730957 6.123873233795166 C 15.12059211730957 7.543220520019531 13.9699878692627 8.693825721740723 12.55064105987549 8.693825721740723 Z M 10.92475318908691 6.123873233795166 C 10.92475318908691 5.225924015045166 11.65269088745117 4.497985363006592 12.55064105987549 4.497985363006592 C 13.44859027862549 4.497985363006592 14.17652893066406 5.225924015045166 14.17652893066406 6.123873233795166 C 14.17652893066406 7.021822452545166 13.44859027862549 7.74976110458374 12.55064105987549 7.74976110458374 C 11.65269088745117 7.74976110458374 10.92475318908691 7.021822452545166 10.92475318908691 6.123873233795166 Z"
              ></path>
            </svg>
            <span class="spanDetails">Dolphin Pools Ltd, E. Garibaldi <br> Street Marsa MRS 9083, Malta</span
            >
          </div> -->
        </section>
      </header>
  
      <!-- main content container -->
      <main class="contentContainer">
        <section class="heroSection">
          <h2 class="title">${data.site} Quotation</h2>
          <p class="date">${data.initialDate}</p>
        </section>
  
        <section class="leftColumn">
        <!-- Client details -->
        <section class="box ClientDetails">
          <div class="boxTitle">
            <h2 class="containerTitle">Client's Details</h2>
            <div class="containerTitleAfter"></div>
          </div>
          <div class="details">
            <h2 class="filedLabel">Full Name</h2>
            <h3 class="filedValue">${data.clientFirstName} ${
    data.clientLastName
  }</h3>
          </div>
  
          <div class="details">
            <h2 class="filedLabel">Email</h2>
            <h3 class="filedValue">${data.email}</h3>
          </div>
  
          <div class="details">
            <h2 class="filedLabel">Phone Number</h2>
            <h3 class="filedValue">${data.clientPhoneNumber}</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Locality:</h2>
            <h3 class="filedValue">${data.address.locality}</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Address Street One</h2>
            <h3 class="filedValue">${data.address.streetLineOne}</h3>
          </div>

          ${
            data.streetLineTwo
              ? `<div class="details">
            <h2 class="filedLabel">Address Street Two</h2>
            <h3 class="filedValue">${data.streetLineTwo}</h3>
          </div>`
              : ``
          }
        </section>
  
        <!-- Pool parameter -->
        <section class="box PoolParameter">
          <div class="boxTitle">
            <h2 class="containerTitle">Pool Parameter</h2>
            <div class="containerTitleAfter"></div>
          </div>
          <div class="details">
            <h2 class="filedLabel">Length:</h2>
            <h3 class="filedValue Number">${data.poolLength}</h3>
          </div>
  
          <div class="details">
            <h2 class="filedLabel">Width:</h2>
            <h3 class="filedValue Number">${data.poolWidth}</h3>
          </div>
  
          <div class="details">
            <h2 class="filedLabel">Depth Start:</h2>
            <h3 class="filedValue Number">${data.poolDepthStart}</h3>
          </div>
  
          <div class="details">
            <h2 class="filedLabel">Depth End:</h2>
            <h3 class="filedValue Number">${
              data.poolDepthEnd ? data.poolDepthEnd : "0"
            }</h3>
          </div>

          <div class="details">
          <h2 class="filedLabel">Pool Volume</h2>
          <h3 class="filedValue Number">${
            data.poolVolume ? data.poolVolume : "0"
          }</h3>
        </div>
          <div class="details">
            <h2 class="filedLabel">Perimeter:</h2>
            <h3 class="filedValue Number">${
              data.poolPerimeter ? data.poolPerimeter : "0"
            }</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Coping Perimeter:</h2>
            <h3 class="filedValue Number">${
              data.copingPerimeter ? data.copingPerimeter : "0"
            }</h3>
          </div>

          ${
            !data.poolType
              ? `<div class="details">
            <h2 class="filedLabel">Balance Tank Length:</h2>
            <h3 class="filedValue Number">${
              data.balanceTankLength ? data.balanceTankLength : "0"
            }</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Balance Tank Width</h2>
            <h3 class="filedValue Number">${
              data.balanceTankWidth ? data.balanceTankWidth : "0"
            }</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Balance Tank Depth</h2>
            <h3 class="filedValue Number">${
              data.balanceTankDepth ? data.balanceTankDepth : "0"
            }</h3>
          </div>

          <div class="details">
            <h2 class="filedLabel">Balance Tank Volume</h2>
            <h3 class="filedValue Number">${
              data.poolVolume ? data.balanceTankVolume : "0"
            }</h3>
          </div>`
              : " "
          }
        </section>
  
        <!-- Pool Options optional -->
        <section class="box PoolOptionalOptions">
          <div class="boxTitle">
            <h2 class="containerTitle">Pool Options</h2>
            <div class="containerTitleAfter"></div>
          </div>
          <div class="details">
            <h2 class="filedLabel">Number Of Wall Inlets</h2>
            <h3 class="filedValue Number">${
              data.numberOfWallInlets ? data.numberOfWallInlets : "0"
            }</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Number Of Sumps</h2>
            <h3 class="filedValue Number">${
              data.numberOfSumps ? data.numberOfSumps : "0"
            }</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Number Of Skimmers</h2>
            <h3 class="filedValue Number">${
              data.numberOfSkimmers ? data.numberOfSkimmers : "0"
            }</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Number Of Lights</h2>
            <h3 class="filedValue Number">${
              data.numberOfLights ? data.numberOfLights : "0"
            }</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Spa Jets</h2>
            <h3 class="filedValue Number">${
              data.spaJets ? data.spaJets : "0"
            }</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Counter Current</h2>
            <h3 class="filedValue Number">${
              data.counterCurrent ? data.counterCurrent : "0"
            }</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Vacuum Points</h2>
            <h3 class="filedValue Number">${
              data.vacuumPoints ? data.vacuumPoints : "0"
            }</h3>
          </div>
        </section>
        </section>
  
        <section class="rightColumn">
        <!-- Pool Options required -->
        <section class="box poolRequiredOptions">

        <div class="detailsBox">
        <h2 class="filedLabel">Quotation Type</h2>
        <h3 class="filedValueBox">${
          data.quotationType ? "Domestic" : "Commercial"
        }</h3>
      </div>
      <div class="detailsBox">
        <h2 class="filedLabel">New Pool</h2>
        <h3 class="filedValueBox">${data.newPool ? "Yes" : "No"}</h3>
      </div>
      ${
        !data.poolType
          ? ` <div class="detailsBox">
        <h2 class="filedLabel">Pool Leaking</h2>
        <h3 class="filedValueBox">${data.poolLeaking ? "Yes" : "No"}</h3>
      </div>`
          : ``
      }

      <div class="detailsBox">
        <h2 class="filedLabelBox">Pool type</h2>
        <h3 class="filedValueBox">${data.poolType ? "Skimmer" : "Overflow"}</h3>
      </div>

      <div class="detailsBox">
        <h2 class="filedLabelBox">Pool Location</h2>
        <h3 class="filedValueBox">${data.poolLocation.label} <br> ${
    data.indoor ? "indoor" : "outdoor"
  }</h3>
      </div>
  
  
          <div class="detailsBox">
            <h2 class="filedLabelBox">Pool Steps</h2>
            <h3 class="filedValueBox">
              ${data.poolSteps ? "Yes" : "No"} 
            </h3>
          </div>
  
          <div class="detailsBox">
            <h2 class="filedLabelBox">Tile Type</h2>
            <h3 class="filedValueBox">${data.tileType.label}</h3>
          </div>
          <div class="detailsBox PriceBox">
            <h2 class="filedLabelBox">Total Price</h2>
            <h3 class="filedValueBox">${data.finalPrice} excl. vat</h3>
          </div>

      <section class="extraRemarks">
        <label for="extraRemarksBox" class="filedLabelBox label">
          Extra remarks
        </label>
        <textarea name="extraRemarks" id="extraRemarksBox" cols="30" rows="10">${
          data.description ? data.description : "Type Something here"
        }
        </textarea>
      </section>
        </section>
      </main>
    </body>
  </html>
  `;
  // ${
  //   data.images
  //     ? `<section class="imagesContainer">
  //     ${data.images.map((image) => {
  //       return "hi";
  //     })}
  //       </section>`
  //     : ""
  // }

  return html;
};
const print = async (data) => {
  try {
    await printAsync({
      html: generatePdf(data),
    });
  } catch (error) {
    alert(error.message);
  }
};

const Share = async (data) => {
  const { uri } = await printToFileAsync({
    html: generatePdf(data),
    name: "name",
  });
  await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
};

export default {
  print,
  Share,
};
