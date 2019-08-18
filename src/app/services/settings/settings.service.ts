import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  settings: Settings = {
    themeUrl: "assets/css/colors/default-dark.css",
    theme: "default-dark"
  };

  selectores:any;

  constructor(@Inject(DOCUMENT) private _document: any) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem("setting", JSON.stringify(this.settings));
  }

  loadSettings() {
    if (localStorage.getItem("setting")) {
      this.settings = JSON.parse(localStorage.getItem("setting"));
      this.applySettings(this.settings.theme);
    } else {
      this.applySettings(this.settings.theme);
    }
  }

  applySettings(theme: string) {
    let url: string = `assets/css/colors/${theme}.css`;
    this._document.getElementById("theme").setAttribute("href", url);
    this.settings.theme = theme;
    this.settings.themeUrl = url;

    this.saveSettings();
  }

}

interface Settings {
  themeUrl: string;
  theme: string;
}
