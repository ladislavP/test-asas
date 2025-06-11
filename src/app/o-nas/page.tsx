import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          O spoločnosti ASAS
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 text-center mb-12">
            Sieť stavebnín ASAS združuje od roku 2009 predajcov stavebnín z celého Slovenska. 
            Vytvárame sieť strategických partnerstiev pre váš úspech.
          </p>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-sm text-gray-600 font-medium mb-4">
                  Pracujeme pre vás už 16 rokov
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Kto stavia s nami,{' '}
                  <span className="text-primary">odmena ho neminie</span>
                </h2>
                <p className="text-gray-600">
                  Jednou z hlavných náplní činností je nákup stavebného materiálu 
                  a jeho predaj prostredníctvom partnerských spoločností. 
                  V aliancii ASAS vás za vernosť odmeníme.
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🏗️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Vernostný program
                </h3>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl text-primary mb-2">📅</div>
              <div className="text-3xl font-bold text-gray-900">15+</div>
              <div className="text-gray-600">Rokov skúseností</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-2">🏪</div>
              <div className="text-3xl font-bold text-gray-900">25+</div>
              <div className="text-gray-600">Predajných miest</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-2">👥</div>
              <div className="text-3xl font-bold text-gray-900">10,000+</div>
              <div className="text-gray-600">Spokojných zákazníkov</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-2">🏆</div>
              <div className="text-3xl font-bold text-gray-900">2000+</div>
              <div className="text-gray-600">Certifikovaných produktov</div>
            </div>
          </div>

          {/* History */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Naša história</h2>
              <p className="text-gray-600 mb-4">
                Sieť stavebnín ASAS bola založená v roku 2009 s víziou 
                vytvorenia silnej aliancie predajcov stavebných materiálov 
                na Slovensku.
              </p>
              <p className="text-gray-600 mb-4">
                Od svojho vzniku sme sa neustále rozrastali a dnes 
                predstavujeme jednu z najväčších sietí stavebnín v krajine.
              </p>
              <p className="text-gray-600">
                Naša filozofia je založená na vzájomnej spolupráci, 
                kvalite produktov a spokojnosti zákazníkov.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Naše hodnoty</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Kvalita</h3>
                    <p className="text-gray-600 text-sm">
                      Ponúkame len overené a certifikované produkty od renomovaných výrobcov.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🤝</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Partnerstvo</h3>
                    <p className="text-gray-600 text-sm">
                      Budujeme dlhodobé vzťahy založené na dôvere a vzájomnom raste.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Spoľahlivosť</h3>
                    <p className="text-gray-600 text-sm">
                      Dodržiavame termíny a záväzky voči našim partnerom a zákazníkom.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Inovácie</h3>
                    <p className="text-gray-600 text-sm">
                      Neustále hľadáme nové riešenia a zlepšujeme naše služby.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Prečo nás kontaktovať?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🏪</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Predajné miesta
                </h3>
                <p className="text-gray-600">
                  Máte záujem o otvorenie predajného miesta v našej sieti? 
                  Kontaktujte nás a spoločne nájdeme najlepšie riešenie.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Partnerstvo
                </h3>
                <p className="text-gray-600">
                  Chcete sa stať naším partnerom? Ponúkame výhodné podmienky 
                  a podporu pri rozvoji vášho podnikania.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

