import { Component, OnInit, Input } from "@angular/core";
import { TravelService } from "src/app/services/travel.service";
import { FlightRequest } from "src/app/models/flight.request.model";
import { FlightPlan } from "src/app/models/flight.plan.model";
import { Travellers } from "src/app/models/travellers.model";
import { environment } from "src/environments/environment";
import { OfferPack } from "src/app/models/offer.pack.model";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-flight-itinerary",
  templateUrl: "./flight-itinerary.component.html",
  styleUrls: ["./flight-itinerary.component.scss"]
})
export class FlightItineraryComponent implements OnInit {
  @Input("offerPack") offerPack: OfferPack;
  @Input("request") request: FlightRequest;
  imgSrc = "assets/img/ai.png";
  showFlightInfo = false;
  currency = environment.currency;
  layovers = 0;
  returnLayovers = 0;
  constructor(
    private service: TravelService,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.layovers =
      this.offerPack.onwardFlightItinerary.layoverDurations != null
        ? this.offerPack.onwardFlightItinerary.layoverDurations.length
        : 0;

    this.returnLayovers =
      this.offerPack.returnFlightItinerary != null &&
      this.offerPack.returnFlightItinerary.layoverDurations != null
        ? this.offerPack.returnFlightItinerary.layoverDurations.length
        : 0;
  }

  get originInfo() {
    return (
      this.offerPack.onwardFlightItinerary.originCity +
      ", " +
      this.offerPack.onwardFlightItinerary.originCountry
    );
  }

  get destinationInfo() {
    return (
      this.offerPack.onwardFlightItinerary.destinationCity +
      ", " +
      this.offerPack.onwardFlightItinerary.destinationCountry
    );
  }

  get layoverPorts() {
    if (
      this.offerPack.onwardFlightItinerary.layoverPorts == null ||
      this.offerPack.onwardFlightItinerary.layoverPorts.length == 0
    ) {
      return "";
    }
    let str = "-";
    for (
      let index = 0;
      index < this.offerPack.onwardFlightItinerary.layoverPorts.length;
      index++
    ) {
      const element: string = this.offerPack.onwardFlightItinerary.layoverPorts[
        index
      ];
      str += " " + element + " -";
    }

    return str;
  }

  get returnOriginInfo() {
    return (
      this.offerPack.returnFlightItinerary.originCity +
      ", " +
      this.offerPack.returnFlightItinerary.originCountry
    );
  }

  get returnDestinationInfo() {
    return (
      this.offerPack.returnFlightItinerary.destinationCity +
      ", " +
      this.offerPack.returnFlightItinerary.destinationCountry
    );
  }

  get returnLayoverPorts() {
    if (
      this.offerPack.returnFlightItinerary.layoverPorts == null ||
      this.offerPack.returnFlightItinerary.layoverPorts.length == 0
    ) {
      return "";
    }
    let str = "-";
    for (
      let index = 0;
      index < this.offerPack.returnFlightItinerary.layoverPorts.length;
      index++
    ) {
      const element: string = this.offerPack.returnFlightItinerary.layoverPorts[
        index
      ];
      str += " " + element + " -";
    }

    return str;
  }
  get getIcon() {
    return this.showFlightInfo ? "keyboard_arrow_up" : "keyboard_arrow_down";
  }
  addToTravelPlan() {
    let user = this.loginService.getUser();
    let fp = new FlightPlan();
    if (user != null) {
      let tvs = new Travellers();
      tvs.email = user.email;
      tvs.contact = user.contact;
      tvs.travellers.push(user.primaryUser);
      fp.travellers = tvs;
    }
    fp.offerPack = this.offerPack;
    fp.req = this.request;
    this.service.pushFlight(fp);
  }
}
