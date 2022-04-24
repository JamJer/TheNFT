import { HeaderComponent } from "./header/header.component";
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";
import { SearchComponent } from "./search/search.component";
import { CARD_COMPONENTS } from "./cards";
import { COMMON_CONPONENTS } from "./commons";

export const COMPONENTS = [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    SearchComponent,
    ...CARD_COMPONENTS,
    ...COMMON_CONPONENTS
];

export * from './header/header.component';
export * from './menu/menu.component';
export * from './footer/footer.component';
export * from './search/search.component';