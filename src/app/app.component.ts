import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Donjons} from "./donjons/types";
import {Guilde, Guildes, Perso, Persos} from "./perso/types";
import {Logs} from "./logs/types";
import {Activites} from "./activite/types";
import {RaiderioService} from "./services/raiderio.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'WOWPerso';
  donjons: Donjons = [];
  persos: Persos = [];
  guildes: Guildes = [];
  logs: Logs = [];
  activites: Activites | undefined;
  perso: Perso | undefined;
  raids = [];
  filteredRealms: string[] = [];

  euRealms: string[] = ["Aegwynn", "Aerie Peak", "Agamaggan", "Aggra (Português)", "Aggramar", "Ahn'Qiraj",
    "Al'Akir", "Alexstrasza", "Alleria", "Alonsus", "Aman'Thul", "Ambossar", "Anachronos", "Anetheron", "Antonidas",
    "Anub'arak", "Arak-arahm", "Arathi", "Arathor", "Archimonde", "Area 52", "Argent Dawn", "Arthas", "Arygos",
    "Ashenvale", "Aszune", "Auchindoun", "Azjol-Nerub", "Azshara", "Azuregos", "Azuremyst", "Baelgun", "Balnazzar",
    "Blackhand", "Blackmoore", "Blackrock", "Blackscar", "Blade's Edge", "Bladefist", "Bloodfeather", "Bloodhoof",
    "Bloodscalp", "Blutkessel", "Booty Bay", "Borean Tundra", "Boulderfist", "Bronze Dragonflight", "Bronzebeard",
    "Burning Blade", "Burning Legion", "Burning Steppes", "C'Thun", "Chamber of Aspects", "Chants éternels", "Cho'gall",
    "Chromaggus", "Colinas Pardas", "Confrérie du Thorium", "Conseil des Ombres", "Culte de la Rive noire", "Dalaran",
    "Dalvengyr", "Darkmoon Faire", "Darksorrow", "Darkspear", "Das Konsortium", "Das Syndikat", "Deathguard", "Deathweaver",
    "Deepholm", "Defias Brotherhood", "Dentarg", "Der Mithrilorden", "Der Rat von Dalaran", "Der abyssische Rat",
    "Destromath", "Dethecus", "Die Aldor", "Die Arguswacht", "Die Nachtwache", "Die Silberne Hand", "Die Todeskrallen",
    "Doomhammer", "Draenor", "Dragonblight", "Dragonmaw", "Drak'thul", "Drek'Thar", "Dun Modr", "Dun Morogh", "Dunemaul",
    "Durotan", "Earthen Ring", "Echo Isles", "Eitrigg", "Eldre'Thalas", "Elune", "Emerald Dream", "Emeriss", "Eonar",
    "Eredar", "Executus", "Exodar", "Festung der Stürme", "Fordragon", "Forscherliga", "Frostmane", "Frostmourne",
    "Frostwhisper", "Frostwolf", "Galakrond", "Garona", "Garrosh", "Genjuros", "Ghostlands", "Gilneas", "Goldrinn",
    "Gordunni", "Gorgonnash", "Greymane", "Grim Batol", "Grom", "Gul'dan", "Hakkar", "Haomarush", "Hellfire",
    "Hellscream", "Howling Fjord", "Hyjal", "Illidan", "Jaedenar", "Kael'thas", "Karazhan", "Kargath", "Kazzak",
    "Kel'Thuzad", "Khadgar", "Khaz Modan", "Khaz'goroth", "Kil'jaeden", "Kilrogg", "Kirin Tor", "Kor'gall", "Krag'jin",
    "Krasus", "Kul Tiras", "Kult der Verdammten", "La Croisade écarlate", "Laughing Skull", "Les Clairvoyants",
    "Les Sentinelles", "Lich King", "Lightbringer", "Lightning's Blade", "Lordaeron", "Los Errantes", "Lothar",
    "Madmortem", "Magtheridon", "Mal'Ganis", "Malfurion", "Malorne", "Malygos", "Mannoroth", "Marécage de Zangar",
    "Mazrigos", "Medivh", "Minahonda", "Moonglade", "Mug'thol", "Nagrand", "Nathrezim", "Naxxramas", "Nazjatar",
    "Nefarian", "Nemesis", "Neptulon", "Ner'zhul", "Nera'thor", "Nethersturm", "Nordrassil", "Norgannon", "Nozdormu",
    "Onyxia", "Outland", "Perenolde", "Pozzo dell'Eternità", "Proudmoore", "Quel'Thalas", "Ragnaros", "Rajaxx",
    "Rashgarroth", "Ravencrest", "Ravenholdt", "Razuvious", "Rexxar", "Runetotem", "Sanguino", "Sargeras", "Saurfang",
    "Scarshield Legion", "Sen'jin", "Shadowsong", "Shattered Halls", "Shattered Hand", "Shattrath", "Shen'dralar",
    "Silvermoon", "Sinstralis", "Skullcrusher", "Soulflayer", "Spinebreaker", "Sporeggar", "Steamwheedle Cartel",
    "Stormrage", "Stormreaver", "Stormscale", "Sunstrider", "Suramar", "Sylvanas", "Taerar", "Talnivarr", "Tarren Mill",
    "Teldrassil", "Temple noir", "Terenas", "Terokkar", "Terrordar", "The Maelstrom", "The Sha'tar", "The Venture Co",
    "Theradras", "Thermaplugg", "Thrall", "Throk'Feroth", "Thunderhorn", "Tichondrius", "Tirion", "Todeswache",
    "Trollbane", "Turalyon", "Twilight's Hammer", "Twisting Nether", "Tyrande", "Uldaman", "Ulduar", "Uldum", "Un'Goro",
    "Varimathras", "Vashj", "Vek'lor", "Vek'nilash", "Vol'jin", "Wildhammer", "Wrathbringer", "Xavius", "Ysera",
    "Ysondre", "Zenedar", "Zirkel des Cenarius", "Zul'jin", "Zuluhed"
  ];

  usRealms: string[] = [
    'Aegwynn', 'Aerie Peak', 'Agamaggan', 'Aggramar', 'Akama', 'Alexstrasza',
    'Alleria', 'Altar of Storms', 'Alterac Mountains', 'Aman\'Thul', 'Andorhal',
    'Anetheron', 'Antonidas', 'Anub\'arak', 'Anvilmar', 'Arathor', 'Archimonde',
    'Area 52', 'Argent Dawn', 'Arthas', 'Arygos', 'Auchindoun', 'Azgalor',
  ];

  constructor(private router: Router) {
  }

  search = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    region: new FormControl('eu', [Validators.required]),
    realm: new FormControl('', [Validators.required])
  });

  get name() {
    return this.search.controls.name;
  }

  get realm() {
    return this.search.controls.realm;
  }

  get region() {
    return this.search.controls.region;
  }

  onSubmit() {
    const name = this.name.value;
    const region = this.region.value;
    const realm = this.normalizeRealmName(this.realm.value);

    this.router.navigate([region, realm, name]);
  }

  filterRealms(value: Event): void {
    const filterValue = (value.target as HTMLInputElement).value.toLowerCase();
    this.filteredRealms = this.getRealmList().filter(realm => realm.toLowerCase().includes(filterValue));
  }

  getRealmList(): string[] {
    return this.search.get('region')?.value === 'eu' ? this.euRealms : this.usRealms;
  }

  realmSelected(realm: string): void {
    this.search.get('realm')?.setValue(realm);
    this.filteredRealms = [];
  }

  normalizeRealmName(name: string | null): string {
    if (!name) {
      return '';
    }
    return name.toLowerCase().replace(/\s/g, '-');
  }

}
