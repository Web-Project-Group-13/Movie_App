# MOVIE APP -elokuvasivusto

Web-ohjelmoinnin sovellusprojekti syksy 2024.


## Projektin esittely

Movie App on web-sovellus leffaharrastajille. Sovellukseen rekisteröitynyt käyttäjä voi lisätä elokuvia suosikkeihin, jättää arvosteluja elokuvista ja sarjoista sanallisesti sekä numeroin arvoilla 1-5. Rekisteröitynyt käyttäjä voi myös perustaa sivustolle ryhmiä esimerkiksi erilaisia elokuvagenrejä varten. Sovellusta voi myös käyttää ilman rekisteröitymistä, jolloin käyttäjä voi hakea elokuvien näytösaikoja Finnkino-elokuvateattereista koko Suomesta sekä hakea elokuvia ja sarjoja. Lisäksi rekisteröitymätön käyttäjä voi lukea muiden käyttäjien antamia arvosteluja elokuvista. Sovelluksen etusivu on esitelty kuvassa 1.

Sovelluksen ovat tehneet toisen vuoden tieto- ja viestintätekniikan opiskelijat Oulun ammattikorkeakoulusta (OAMK). Projektiryhmän jäseniä ovat olleet Jenni Välikangas, Johanna Kuikka, Jaakko Hätälä ja Miko Kylmänen. Ryhmän jokainen jäsen on tehnyt fullstack-ohjelmointia, mutta jokaiselle jaettiin myös erillisiä vastuualueita. Jenni on vastannut elokuvien hausta Finnkino APIsta, käyttäjän rekisteröinnistä, profiilisivusta sekä elokuvien arvosteluista. Johanna on vastannut elokuvien hausta Finnkino APIsta, käyttäjän kirjautumisesta sekä ryhmäsivusta. Jaakko on vastannut sovelluksen tietokannasta sekä hakutoiminnoista Movie Databasesta ja Miko on osallistunut hakutoimintojen toteutukseen Movie Databasea hyödyntäen.



![image](https://github.com/user-attachments/assets/10d3bcc7-4b33-4667-8280-ae9bd1749aba)

_Kuva 1. Movie App -sovelluksen etusivu._




## Teknologiat


### Frontend

Sovelluksen käyttöliittymä on toteutettu käyttäen moderneja web-tekniikoita, kuten React-kirjastoa työkaluineen. Reactin avulla käyttöliittymästä on saatu tehokas ja dynaaminen, jonka tilamuutoksia on helppo hallita. Sovelluksen reitityksessä käytetään React Router DOM -kirjastoa, mikä mahdollistaa eri näkymien hallinnan ja siirtymisen sovelluksen sisällä. Kokonaisuuden rakentamisessa on hyödynnetty myös ulkopuolisia kirjastoja, kuten Axiosta, jota on hyödynnetty kommunikoinnissa palvelimen kanssa.

Frontendin arkkitehtuuri noudattaa komponenttipohjaista lähestymistapaa. App.js-tiedosto toimii keskeisenä reititystiedostona, jonka avulla sovellus navigoi eri näkymien välillä. Näkymät on eroteltu omiin pages- ja components-kansioihin, jolloin frontendin rakentaminen ja organisointi on pysynyt tehokkaana ja helposti lähestyttävänä.

Sovellus on integroitu kolmansien osapuolten APIen kanssa. Elokuvien, sarjojen sekä näyttelijöiden hakutoiminnoissa on käytetty The Movie Database (TMDB) -rajapintaa. Toinen API tarjoaa kaikki Finnkinon elokuvateatterit Suomessa sekä niissä esitettävien elokuvien näytösajat. Näiden APIen tarjoamia tietoja voidaan hyödyntää esimerkiksi niin, että käyttäjä katsoo kyseisellä ajanhetkellä näytettävät elokuvat haluamastaan Finnkinon elokuvateatterista ja sen jälkeen etsii elokuvasta lisätietoja hyödyntäen TMDB:n tarjoamaa elokuvien hakua.


### Backend

Sovelluksessa käytetään PostgreSQL-tietokantaa käyttäjien tietojen tallentamiseen. Tietokantaan tallennetaan esimerkiksi käyttäjäkohtaiset tiedot, arvostelut ja ryhmät. Tietokannan keskiössä on käyttäjä, joka voi tehdä arvosteluita elokuvista ja lisätä niitä suosikkeihin. Käyttäjä voi myös perustaa eri ryhmiä, joille annetaan nimi ryhmän luomisen yhteydessä. Käyttäjä voi lisätä ryhmään elokuvasuosituksia.

Sovelluksen palvelinpuoli on kehitetty Javascriptin Node.js-ajoympäristössä Express-kirjastoa hyödyntäen. Node.js tarjoaa ajoympäristön Javascript-ohjelmoinnille palvelinpuolella, kun taas Express tekee palvelimen reitityksestä ja konfiguroinnista sekä HTTP-pyyntöjen käsittelystä helppoa ja selkeää.

Tietoturvasta on huolehdittu eri kirjastoilla, kuten CORS, JWT sekä Bcrypt. CORS eli Cross-origin resource sharing on mekanismi, jolla säädellään verkkosivujen lataamia resursseja eri alkuperistä tulevilta verkkopalvelimilta. Tällä voidaan määrittää, mitkä verkkopalvelinosoitteet saavat ladattua resursseja sovelluksen kehittäjän rajapinnasta. JSON Web Token eli JWT on tiiviste (token), jota käytetään käyttäjien autentikointiin. Tällä tavalla osa päätepisteistä on suojattu, jolloin ainoastaan sisäänkirjautunut käyttäjä voi kutsua tiettyjä päätepisteitä. Palvelin luo tokenin sisäänkirjautuessa ja se luodaan käyttäjän ID:n sekä salaisen avaimen avulla. Bcrypt on käyttäjien salasanojen salaamiseen tarkoitettu kirjasto.


## Sovelluksen käyttöönotto

Voit ottaa sovelluksen käyttöön omalla tietokoneellasi seuraavasti:

1. Kloonaa projekti GitHubista. Projektin URL: https://github.com/Web-Project-Group-13/movieapp.git
2. Määritä PostgreSQL-tietokantayhteys siirtymällä projektissa server-kansioon ja aja siinä komento npm run devStart.
3. Käynnistä sovellus projektin juurikansiossa komennolla npm start. Sovellus avautuu selaimessa osoitteessa http://localhost:3000/login


