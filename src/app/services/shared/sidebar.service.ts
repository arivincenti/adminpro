import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SidebarService {
  menu: any = [
    {
      title: "Principal",
      icon: "mdi mdi-gauge",
      submenu: [
        { subtitle: "Dashboard", url: "/dashboard" },
        { subtitle: "Graphics", url: "/graphics1" },
        { subtitle: "Progress", url: "/progress" },
        { subtitle: "Promises", url: "/promises" },
        { subtitle: "Rxjs", url: "/rxjs" }
      ]
    }
  ];

  constructor() {}
}
