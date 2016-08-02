/*New Splashpage Styles*/

.title-head {
  margin-top: -60px;
}

.title-subhead {
  margin-top: -20px;
}

.title-hr {
  margin-top: 0px;
}

square {
  float: left;
  position: relative;
  width: 18%;
  padding-bottom: 18%;
  margin: 1%;
  background-color: #1E1E1E;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}

leftSquare {
  float: left;
  position: relative;
  width: 18%;
  padding-bottom: 18%;
  margin: 1% 1% 1% 22%;
  background-color: #1E1E1E;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}

.ko-content {
    position:absolute;
    height:90%;
    width:90%;
    padding: 5%;
    margin-top: 70%;
    margin-left: 40%;
}

.kophiphi {
  background-image: url('../images/kophiphi.jpg');
  -webkit-filter: grayscale(100%);
  -webkit-transition: .5s ease-in-out;
  -moz-filter: grayscale(100%);
  -moz-transition: .5s ease-in-out;
  -o-filter: grayscale(100%);
  -o-transition: .5s ease-in-out;
}

.kophiphi:hover {
  -webkit-filter: grayscale(0%);
  -webkit-transition: .5s ease-in-out;
  -moz-filter: grayscale(0%);
  -moz-transition: .5s ease-in-out;
  -o-filter: grayscale(0%);
  -o-transition: .5s ease-in-out;
}

#kophiphi-text, #fridge-text {
  display: none;
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.kophiphi:hover > #kophiphi-text {
  display: block;
}

.kophiphi:hover > #kophiphi-text {
  display: block;
}

.fridge {
  background-image: url('../images/fridge.jpg');
  -webkit-filter: grayscale(100%);
  -webkit-transition: .5s ease-in-out;
  -moz-filter: grayscale(100%);
  -moz-transition: .5s ease-in-out;
  -o-filter: grayscale(100%);
  -o-transition: .5s ease-in-out;
}

.fridge:hover {
  -webkit-filter: grayscale(0%);
  -webkit-transition: .5s ease-in-out;
  -moz-filter: grayscale(0%);
  -moz-transition: .5s ease-in-out;
  -o-filter: grayscale(0%);
  -o-transition: .5s ease-in-out;
}

.fridge:hover > #fridge-text {
  display: block;
}

.fridge-content {
    position:absolute;
    height:90%;
    width:90%;
    padding: 5%;
    margin-top: 20%;
    margin-left: 40%;
}

@keyframes type{
  from { width: 0; }
}

p.slide{
  /*-webkit-transform: rotate(90deg);*/
  font-size: 20px;
  margin: 10px 0 0 10px;
  white-space: nowrap;
  overflow: hidden;
  width: 30em;
  animation: type 3s steps(60, end);
}

/*photo-text{
  color: Pink;
  font-family: "Courier";
  font-size: 20px;
  margin: 10px 0 0 10px;
  white-space: nowrap;
  overflow: hidden;
  width: 30em;
  animation: type 4s steps(60, end);
}*/
