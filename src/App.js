import './App.css';
const { useState, useEffect, useContext, createContext } = React;

// Context létrehozása
const AppContext = createContext();

// Kezdeti adatok
const initialData = {
  modules: [
    {
      id: "ai-fundamentals",
      title: "MI alapfogalmak",
      description: "A mesterséges intelligencia alapvető fogalmai és működési elvei",
      locked: false,
      content: {
        intro: "A mesterséges intelligencia egy olyan technológiai terület, amely a gépek „gondolkodási" képességeinek fejlesztésére irányul.",
        dataTypes: [
          {
            name: "Strukturált adatok",
            description: "Adatbázisokban tárolt, jól szervezhető adatok"
          },
          {
            name: "Strukturálatlan adatok", 
            description: "Szövegek, képek, hangfájlok"
          }
        ],
        algorithms: [
          {
            name: "Felügyelt tanulás",
            description: "Címkézett adatokból tanul"
          },
          {
            name: "Felügyelet nélküli tanulás",
            description: "Rejtett mintákat fedez fel"
          }
        ]
      },
      quiz: [
        {
          question: "Mi a mesterséges intelligencia alapvető célja?",
          options: ["Emberek helyettesítése", "Gépek gondolkodási képességének fejlesztése", "Munkahelyek megszüntetése"],
          correct: 1
        }
      ]
    },
    {
      id: "why-ai-needed",
      title: "Miért van szükség MI-re?",
      description: "Az ipari környezetben használt MI alkalmazások előnyei",
      locked: true,
      content: {
        intro: "A modern ipar egyre komplexebb kihívásokkal néz szembe, amelyekre a hagyományos megoldások már nem elégségesek.",
        sensors: [
          {
            name: "Hőmérséklet szenzorok",
            description: "Folyamatos monitoring"
          },
          {
            name: "Vibráció szenzorok", 
            description: "Gépek állapot követése"
          }
        ],
        benefits: [
          "Költségcsökkentés",
          "Minőségjavítás", 
          "Predictív karbantartás"
        ]
      },
      quiz: [
        {
          question: "Mi a Big Data egyik fő jellemzője?",
          options: ["Kis adatmennyiség", "Nagy sebesség", "Egyszerű struktúra"],
          correct: 1
        }
      ]
    },
    {
      id: "industry-4-ai-connection",
      title: "Ipar 4.0 és MI kapcsolata",
      description: "A negyedik ipari forradalom és a mesterséges intelligencia szinergiája",
      locked: true,
      content: {
        intro: "Az Ipar 4.0 és a mesterséges intelligencia szoros kapcsolatban állnak egymással.",
        techPillars: [
          "IoT eszközök",
          "Big Data",
          "Cloud computing",
          "Cyber-fizikai rendszerek"
        ],
        aiCapabilities: [
          "Prediktív analitika",
          "Automatizált döntéshozatal",
          "Optimalizálás"
        ]
      },
      quiz: [
        {
          question: "Az Ipar 4.0 egyik alappillére:",
          options: ["Hagyományos gyártás", "IoT eszközök", "Kézi munka"],
          correct: 1
        }
      ]
    },
    {
      id: "it-technician-future",
      title: "Ipari informatikai technikus jövője",
      description: "Karrierlehetőségek és kompetenciák az MI korában",
      locked: true,
      content: {
        intro: "Az ipari informatikai technikus szerepe jelentősen átalakul a mesterséges intelligencia térnyerésével.",
        newSkills: [
          "AI rendszerek karbantartása",
          "Adatelemzési képességek",
          "IoT integráció"
        ],
        careerPaths: [
          "AI specialista",
          "Data analyst",
          "IoT technikus"
        ]
      },
      quiz: [
        {
          question: "Mi a legfontosabb új készség az MI korában?",
          options: ["Hagyományos programozás", "Adatelemzés", "Kézi szerelés"],
          correct: 1
        }
      ]
    }
  ]
};

// Header komponens
function Header({ user, onAuthClick, onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">MI Tananyag Platform</h1>
        <div className="user-info">
          {user.loggedIn ? (
            <>
              <span className="score">Pontszám: {user.totalScore}</span>
              <span>Üdvözöljük, {user.name}!</span>
              <button className="btn btn--secondary" onClick={onLogout}>
                Kijelentkezés
              </button>
            </>
          ) : (
            <button className="btn btn--primary" onClick={onAuthClick}>
              Bejelentkezés
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

// Auth komponens
function Auth({ onLogin, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onLogin(formData.name.trim());
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container" onClick={onClose}>
      <div className="auth-form" onClick={(e) => e.stopPropagation()}>
        <h2>{isLogin ? 'Bejelentkezés' : 'Regisztráció'}</h2>
        
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Bejelentkezés
          </button>
          <button 
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Regisztráció
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Név</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">Jelszó</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <button type="submit" className="btn btn--primary btn--full-width">
            {isLogin ? 'Bejelentkezés' : 'Regisztráció'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Quiz komponens
function Quiz({ quiz, onComplete }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === quiz.correct;
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onComplete(correct);
    }, 2000);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-question">
        <h4>{quiz.question}</h4>
        <div className="quiz-options">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${
                selectedAnswer === index ? 'selected' : ''
              } ${
                showResult && index === quiz.correct ? 'correct' : ''
              } ${
                showResult && selectedAnswer === index && index !== quiz.correct ? 'incorrect' : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>
        
        {selectedAnswer !== null && !showResult && (
          <button className="btn btn--primary" onClick={handleSubmit}>
            Válasz elküldése
          </button>
        )}
        
        {showResult && (
          <div className={`quiz-result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '✅ Helyes válasz! +10 pont' : '❌ Helytelen válasz. A helyes válasz: ' + quiz.options[quiz.correct]}
          </div>
        )}
      </div>
    </div>
  );
}

// LearningModule komponens
function LearningModule({ module, onComplete }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizComplete = (correct) => {
    setQuizCompleted(true);
    onComplete(module.id, correct);
  };

  const renderContent = () => {
    const content = module.content;
    
    return (
      <div className="module-content">
        <div className="intro">{content.intro}</div>
        
        {content.dataTypes && (
          <>
            <h4>Adattípusok</h4>
            <ul>
              {content.dataTypes.map((type, index) => (
                <li key={index}>
                  <strong>{type.name}:</strong> {type.description}
                </li>
              ))}
            </ul>
          </>
        )}
        
        {content.algorithms && (
          <>
            <h4>Algoritmusok</h4>
            <ul>
              {content.algorithms.map((algo, index) => (
                <li key={index}>
                  <strong>{algo.name}:</strong> {algo.description}
                </li>
              ))}
            </ul>
          </>
        )}
        
        {content.sensors && (
          <>
            <h4>Szenzortechnológiák</h4>
            <ul>
              {content.sensors.map((sensor, index) => (
                <li key={index}>
                  <strong>{sensor.name}:</strong> {sensor.description}
                </li>
              ))}
            </ul>
          </>
        )}
        
        {content.benefits && (
          <>
            <h4>Előnyök</h4>
            <ul>
              {content.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </>
        )}
        
        {content.techPillars && (
          <>
            <h4>Technológiai pillérek</h4>
            <ul>
              {content.techPillars.map((pillar, index) => (
                <li key={index}>{pillar}</li>
              ))}
            </ul>
          </>
        )}
        
        {content.aiCapabilities && (
          <>
            <h4>MI képességek</h4>
            <ul>
              {content.aiCapabilities.map((capability, index) => (
                <li key={index}>{capability}</li>
              ))}
            </ul>
          </>
        )}
        
        {content.newSkills && (
          <>
            <h4>Új készségek</h4>
            <ul>
              {content.newSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </>
        )}
        
        {content.careerPaths && (
          <>
            <h4>Karrierútvonalak</h4>
            <ul>
              {content.careerPaths.map((path, index) => (
                <li key={index}>{path}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="learning-module">
      <div className="module-header">
        <h2>{module.title}</h2>
        {!showQuiz && !quizCompleted && (
          <button 
            className="btn btn--primary"
            onClick={() => setShowQuiz(true)}
          >
            Kvíz indítása
          </button>
        )}
      </div>
      
      {renderContent()}
      
      {showQuiz && !quizCompleted && (
        <Quiz quiz={module.quiz[0]} onComplete={handleQuizComplete} />
      )}
      
      {quizCompleted && (
        <div className="text-center">
          <div className="status status--success">
            Modul teljesítve! ✅
          </div>
        </div>
      )}
    </div>
  );
}

// SessionManager komponens
function SessionManager({ modules, completedModules, onModuleSelect, selectedModule }) {
  const progress = (completedModules.length / modules.length) * 100;
  
  return (
    <div className="main-content">
      <div className="welcome-section">
        <h1>MI Tananyag Platform</h1>
        <p>
          Fedezze fel a mesterséges intelligencia világát az ipari informatikai technikus szemszögéből.
          Teljesítse a modulokat sorrendben és szerezzen pontokat!
        </p>
      </div>
      
      <div className="progress-section">
        <h3>Haladás</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text">
          {completedModules.length} / {modules.length} modul teljesítve ({Math.round(progress)}%)
        </div>
      </div>
      
      {selectedModule ? (
        <div>
          <button 
            className="btn btn--secondary mb-8"
            onClick={() => onModuleSelect(null)}
          >
            ← Vissza a modulokhoz
          </button>
          <LearningModule 
            module={selectedModule} 
            onComplete={(moduleId, correct) => {
              // A completion kezelését a App komponens végzi
              onModuleSelect(null);
            }}
          />
        </div>
      ) : (
        <>
          <div className="modules-grid">
            {modules.map((module) => {
              const isCompleted = completedModules.includes(module.id);
              const isLocked = module.locked && !isCompleted;
              
              return (
                <div
                  key={module.id}
                  className={`module-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => !isLocked && onModuleSelect(module)}
                >
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
              );
            })}
          </div>
          
          {completedModules.length === modules.length && (
            <div className="pitch-section">
              <h3>🎉 Gratulálunk!</h3>
              <p>
                Sikeresen teljesítette az összes modult! Most készíthet egy pitch-et 
                a megszerzett tudásáról.
              </p>
              <button className="btn btn--primary btn--lg">
                Pitch készítése
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Footer komponens
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 MI Tananyag Platform. Minden jog fenntartva.</p>
      </div>
    </footer>
  );
}

// Fő App komponens
function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('miUser');
    return savedUser ? JSON.parse(savedUser) : {
      name: '',
      loggedIn: false,
      completedModules: [],
      quizScores: {},
      totalScore: 0
    };
  });
  
  const [modules, setModules] = useState(initialData.modules);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  // LocalStorage mentés
  useEffect(() => {
    localStorage.setItem('miUser', JSON.stringify(user));
  }, [user]);

  // Modulok feloldása
  useEffect(() => {
    setModules(prevModules => 
      prevModules.map((module, index) => ({
        ...module,
        locked: index > 0 && !user.completedModules.includes(prevModules[index - 1].id)
      }))
    );
  }, [user.completedModules]);

  const handleLogin = (name) => {
    setUser(prev => ({
      ...prev,
      name,
      loggedIn: true
    }));
  };

  const handleLogout = () => {
    setUser({
      name: '',
      loggedIn: false,
      completedModules: [],
      quizScores: {},
      totalScore: 0
    });
    setSelectedModule(null);
  };

  const handleModuleComplete = (moduleId, correct) => {
    if (user.completedModules.includes(moduleId)) return;
    
    const points = correct ? 10 : 0;
    setUser(prev => ({
      ...prev,
      completedModules: [...prev.completedModules, moduleId],
      quizScores: { ...prev.quizScores, [moduleId]: correct },
      totalScore: prev.totalScore + points
    }));
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    if (module) {
      // Modul teljesítése a LearningModule-ban történik
      setTimeout(() => {
        handleModuleComplete(module.id, true); // Egyszerűsített logika
      }, 5000);
    }
  };

  if (!user.loggedIn) {
    return (
      <div className="app">
        <Header user={user} onAuthClick={() => setShowAuth(true)} />
        <div className="main-content">
          <div className="welcome-section">
            <h1>Üdvözöljük a MI Tananyag Platformon!</h1>
            <p>
              Jelentkezzen be a tanulás megkezdéséhez és fedezze fel 
              a mesterséges intelligencia lehetőségeit az iparban.
            </p>
            <button 
              className="btn btn--primary btn--lg"
              onClick={() => setShowAuth(true)}
            >
              Bejelentkezés a tanuláshoz
            </button>
          </div>
        </div>
        <Footer />
        {showAuth && (
          <Auth 
            onLogin={handleLogin} 
            onClose={() => setShowAuth(false)} 
          />
        )}
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ user, modules }}>
      <div className="app">
        <Header 
          user={user} 
          onAuthClick={() => setShowAuth(true)}
          onLogout={handleLogout}
        />
        
        <SessionManager 
          modules={modules}
          completedModules={user.completedModules}
          onModuleSelect={handleModuleSelect}
          selectedModule={selectedModule}
        />
        
        <Footer />
        
        {showAuth && (
          <Auth 
            onLogin={handleLogin} 
            onClose={() => setShowAuth(false)} 
          />
        )}
      </div>
    </AppContext.Provider>
  );
}

// Alkalmazás renderelése
ReactDOM.render(<App />, document.getElementById('root'));