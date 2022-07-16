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
  
        .logoContiner {
          display: flex;
          width: 50%;
          align-items: center;
          justify-content: flex-start;
        }
  
        .Logo {
          width: 150px;
          height: 150px;
        }
        .logoTitle {
          font-size: 2rem;
          transform: translate(-4%, -5%);
          font-family: "Pacifico", cursive !important;
          color: var(--barBackgroundColor);
        }
  
        .copmanydetails {
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
        <!-- Logo  Continer-->
  
        <div class="logoContiner">
          <!-- Logo -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="Logo"
            width="83"
            height="83"
            viewBox="0 0 83 83"
          >
            <defs>
              <filter
                id="Logo"
                x="0"
                y="0"
                width="83"
                height="83"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="9" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity="0.161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Logo)">
              <image
                id="Logo-2"
                data-name="Logo"
                width="65"
                height="65"
                transform="translate(9)"
                xlink:href="data:image/png;base64,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"
              />
            </g>
          </svg>
  
          <!-- Logo Text -->
          <h1 class="logoTitle">olphin pools Limited</h1>
        </div>
  
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
          <h2 class="title">${data.title} Quotation</h2>
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
            <h3 class="filedValue">${data.clientAddressLocality}</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Address Street One</h2>
            <h3 class="filedValue">${
              data.clientAddressStreetOne
                ? data.clientAddressStreetOne
                : "not set"
            }</h3>
          </div>
  
          <div class="details">
            <h2 class="filedLabel">Address Street Two</h2>
            <h3 class="filedValue">${
              data.clientAddressStreetTwo
                ? data.clientAddressStreetTwo
                : "not set"
            }</h3>
          </div>
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
          <div class="details">
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
            <h2 class="filedLabel">Balance Tank Pipe</h2>
            <h3 class="filedValue Number">${
              data.balanceTankPipe ? data.balanceTankPipe : "0"
            }</h3>
          </div>
          <div class="details">
            <h2 class="filedLabel">Volume</h2>
            <h3 class="filedValue Number">${
              data.poolVolume ? data.poolVolume : "0"
            }</h3>
          </div>
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
            <h2 class="filedLabel">Project Type:</h2>
            <h3 class="filedValueBox">${data.projectType.label}</h3>
          </div>
  
          <div class="detailsBox">
            <h2 class="filedLabelBox">Pool type</h2>
            <h3 class="filedValueBox">${data.poolType_ID.label}</h3>
          </div>
  
          <div class="detailsBox">
            <h2 class="filedLabelBox">Pool Location</h2>
            <h3 class="filedValueBox">${data.poolLocation_ID.label} <br> ${
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
            <h2 class="filedLabelBox">Mosaic or Tile</h2>
            <h3 class="filedValueBox">${
              data.mosaicOrTileBorder ? "Mosaic" : "Tile"
            }</h3>
          </div>
          <div class="detailsBox">
            <h2 class="filedLabelBox">Pool Leaking</h2>
            <h3 class="filedValueBox">${data.poolLeaking ? "Yes" : "No"}</h3>
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
