import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {RaiderioService} from "./raiderio.service";

describe('RaiderioService', () => {
  it("should get character mythic plus ranks", (done: DoneFn) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    const service = new RaiderioService(http);

    service.getCharacterMythicPlusRanks('Nenyïm', 'les-sentinelles', 'eu').subscribe((data: any) => {
      expect(data.pseudo).toEqual('Nenyïm');
      expect(data.serveur).toEqual('les-sentinelles');
      expect(data.continent).toEqual('eu');
      done();
    });

    const request = httpController.expectOne("https://raider.io/api/v1/characters/profile?region=eu&realm=les-sentinelles&name=Nenyïm&fields=guild");

    request.flush({
      name: "Nenyïm",
      race: "Blood elf",
      class: "Paladin",
      active_spec_name: "Healer",
      active_spec_role: "Holy",
      gender: "Male",
      faction: "Horde",
      achievement_points: 20000,
      honorable_kills: 100,
      thumbnail_url: "ma super image",
      region: "eu",
      realm: "les-sentinelles",
      last_crawled_at: "mouh",
      profile_url: "mouh.html",
      profile_banner: "mouh.jpg",
      guild: {
        name: "Les Chevaliers de la Table Ronde",
        realm: "les-sentinelles",
      }
    });
  });

  it("sould display donjons when we call getCharacterMythicPlusRanks", (done: DoneFn) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    const service = new RaiderioService(http);

    service.getCharacterMythicPlusBestRuns('Nenyïm', 'les-sentinelles', 'eu').subscribe((data: any) => {
      expect(data[0].nom).toBe('Malepeste');
      done();
    });

    const request = httpController.expectOne("https://raider.io/api/v1/characters/profile?region=eu&realm=les-sentinelles&name=Nenyïm&fields=mythic_plus_best_runs");

    request.flush({
      mythic_plus_best_runs: [
        {
          dungeon: "Malepeste",
          short_name: "m",
          mythic_level: 20,
          completed_at: "string",
          clear_time_ms: 125478,
          num_keystone_upgrades: 20,
          map_challenge_mode_id: 1,
          zone_id: 1,
          score: 160,
          affixes: [
            {id: 1, name: "string", description: "string", icon: "string", wowhead_url: "string"},
            {id: 2, name: "string", description: "string", icon: "string", wowhead_url: "string"},
            {id: 3, name: "string", description: "string", icon: "string", wowhead_url: "string"},
          ],
          url: "string",
        }
      ],
    });
  });

  it('should display activities when we call getCharacterMythicLastRuns', (done: DoneFn) => {
    const mockResponse = {
      name: "Nenyïm",
      mythic_plus_recent_runs: [
        {
          completed_at: "aujourd'hui",
          dungeon: "Malepeste",
          mythic_level: 20
        },
      ]
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    const service = new RaiderioService(http);

    service.getCharacterMythicLastRuns('Nenyïm', 'les-sentinelles', 'eu').subscribe((data: any) => {
      expect(data.pseudo).toBe('Nenyïm');
      expect(data.activitesArray).toEqual([
        {date: "aujourd'hui", donjon: "Malepeste", niveau: 20},
      ]);
      done();
    });

    const request = httpController.expectOne("https://raider.io/api/v1/characters/profile?region=eu&realm=les-sentinelles&name=Nenyïm&fields=mythic_plus_recent_runs");

    request.flush(mockResponse);
  });

  it('should return raid progress for a character when we call getCharacterRaidProgress', (done: DoneFn) => {
    const MOCK_RESPONSE = {
      raid_progression: {
        "aberrus-the-shadowed-crucible": {
          "summary": "2/9 M",
          "total_bosses": 9,
          "normal_bosses_killed": 9,
          "heroic_bosses_killed": 9,
          "mythic_bosses_killed": 2,
        },
        "sanctum-of-domination": {
          "summary": "10/10 H",
          "total_bosses": 10,
          "normal_bosses_killed": 10,
          "heroic_bosses_killed": 10,
          "mythic_bosses_killed": 4,
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    const service = new RaiderioService(http);

    const expectedData = [
      {
        nom: "aberrus-the-shadowed-crucible",
        summary: "2/9 M",
        boss: 9,
        nm: 9,
        hm: 9,
        mm: 2,
      },
      {
        nom: "sanctum-of-domination",
        summary: "10/10 H",
        boss: 10,
        nm: 10,
        hm: 10,
        mm: 4,
      }
    ];

    service.getCharacterRaidsProgress('Nenyïm', 'les-sentinelles', 'eu').subscribe((data: any) => {
      expect(data).toEqual(expectedData);
      done();
    });

    const request = httpController.expectOne("https://raider.io/api/v1/characters/profile?region=eu&realm=les-sentinelles&name=Nenyïm&fields=raid_progression");
    expect(request.request.method).toEqual('GET');

    request.flush(MOCK_RESPONSE);
  });
});
