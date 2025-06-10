import '@db-ui/core/dist/css/enterprise/db-ui-core.vars.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  DbBrand,
  DbFooter,
  DbHeader,
  DbLink,
  DbMainnavigation,
  DbPage
} from '@db-ui/react-elements';

import { navigationItems } from './components/navigation/items';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

const switchesData = [
  { label: 'BIM Model', value: false },
  { label: 'Flooding risk area', value: false },
  { label: 'Landslide risk area', value: false },
  { label: 'Land coverage', value: false },
  { label: 'Satellite image', value: false }
];




function App() {
  const [sliderValue, setSliderValue] = useState(50);
  const [switches, setSwitches] = useState(switchesData);
  const [selectedRisk, setSelectedRisk] = useState('Flood');
  const [includeClimate, setIncludeClimate] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioDesc, setScenarioDesc] = useState('');
  const [temperature, setTemperature] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageMap = import.meta.glob('./imagenes/*', { eager: true });

  const images = Object.keys(imageMap)
    .sort() // Asegura orden por nombre
    .map((path) => imageMap[path].default);


  const handleSwitchChange = (index) => {
    const updatedSwitches = [...switches];
    updatedSwitches[index].value = !updatedSwitches[index].value;
    setSwitches(updatedSwitches);
  };

  return (
    <DbPage>
      <DbHeader slot="header">
        <DbBrand src={`${import.meta.env.BASE_URL}db_logo.svg`} href="/">
          DB Innovation Project: Risk Management Tool
        </DbBrand>

        <DbMainnavigation>
          {navigationItems.map((item, index) => (
            <DbLink
              current={index === 0 ? 'page' : false}
              key={`mainnavigation-item-${index}`}
            >
              <Link to={item.link}>{item.label}</Link>
            </DbLink>
          ))}
        </DbMainnavigation>
      </DbHeader>

      {/* Body Content */}
      <div className="container-fluid my-4">
        <div className="row">
          {/* Left: Scrollable panel */}
          <div className="col-md-4" style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
            <div className="d-flex flex-column gap-4">
              {/* Section: Simulation setup */}
              <div>
                <h5>Simulation Setup</h5>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Scenario name"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                />
                <textarea
                  className="form-control"
                  placeholder="Scenario description"
                  rows="2"
                  value={scenarioDesc}
                  onChange={(e) => setScenarioDesc(e.target.value)}
                ></textarea>
              </div>

              {/* Risk Type */}
              <div>
                <h6>Risk Type</h6>
                <select
                  className="form-select"
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                >
                  <option value="Flood">Flood</option>
                  <option value="Landslide">Landslide</option>
                  <option value="Seismic">Seismic</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Simulation years slider */}
              <div>
                <label htmlFor="slider" className="form-label">
                  Simulation Years: {sliderValue}
                </label>
                <input
                  type="range"
                  className="form-range"
                  id="slider"
                  min="1"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setSliderValue(value);
                    const index = Math.floor((value - 1) / (100 / images.length));
                    setCurrentImageIndex(index);
                  }}
                />
              </div>

              {/* Climate change toggle */}
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="climateSwitch"
                  checked={includeClimate}
                  onChange={() => setIncludeClimate(!includeClimate)}
                />
                <label className="form-check-label" htmlFor="climateSwitch">
                  Include Climate Change Effects
                </label>
              </div>

              {includeClimate && (
                <div className="btn-group" role="group" aria-label="Climate Scenarios">
                  {[1, 2, 3].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`btn btn-outline-primary ${temperature === t ? 'active' : ''}`}
                    onClick={() => {
                      setTemperature(t);
                      setCurrentImageIndex(t); // Usa t directamente o haz una lógica más específica
                    }}
                  >
                    {t}.0 °C
                  </button>
                  ))}
                </div>
              )}

              {/* Visible Layers */}
              <div>
                <h6>Visible Layers</h6>
                {switches.map((sw, index) => (
                  <div className="form-check form-switch" key={index}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`switch-${index}`}
                      checked={sw.value}
                      onChange={() => handleSwitchChange(index)}
                    />
                    <label className="form-check-label" htmlFor={`switch-${index}`}>
                      {sw.label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="d-grid gap-2">
                <button className="btn btn-primary">Load BIM Model</button>
                <button className="btn btn-primary">Load GIS Data</button>
                <button className="btn btn-success">Run Simulation</button>
              </div>
            </div>
          </div>

          {/* Right: Static image viewer */}
          <div className="col-md-8 d-flex align-items-center justify-content-center">
          <img
            src={images[currentImageIndex]}
            alt="Simulation Step"
            className="img-fluid rounded shadow"
            style={{ maxHeight: '90vh', objectFit: 'cover' }}
          />
          </div>
        </div>

        <Outlet />
      </div>

      <DbFooter slot="footer" border>
        DB Engineering and Consulting, Bogotá
      </DbFooter>
    </DbPage>
  );
}

export default App;
