import { useState, useMemo, useEffect } from "react";
import {
  SoccerBallIcon, SearchIcon, CloseIcon, ClockIcon, TimerIcon,
  HourglassIcon, MapPinIcon, LiveDotIcon, CountryFlag,
} from "./icons";
import "./App.css";

// ── Real World Cup 2026 Schedule (all times stored as ET ISO strings) ──────────
const MATCHES = [
  // June 11
  { id:1,  date:"2026-06-11", timeET:"15:00", group:"A", home:"Mexico",       away:"South Africa",      venue:"Estadio Azteca, Mexico City",             stage:"Group", result:"2-0",  done:true },
  { id:2,  date:"2026-06-11", timeET:"18:00", group:"A", home:"South Korea",  away:"Czechia",           venue:"Estadio Akron, Zapopan",                  stage:"Group", result:"2-1",  done:true },
  // June 12
  { id:3,  date:"2026-06-12", timeET:"15:00", group:"B", home:"Canada",       away:"Bosnia & Herz.",    venue:"Toronto Stadium, Toronto",                stage:"Group", result:"1-1",  done:true },
  { id:4,  date:"2026-06-12", timeET:"21:00", group:"D", home:"USA",          away:"Paraguay",          venue:"Los Angeles Stadium, Inglewood",           stage:"Group", result:"4-1",  done:true },
  // June 13
  { id:5,  date:"2026-06-13", timeET:"15:00", group:"B", home:"Qatar",        away:"Switzerland",       venue:"Levi's Stadium, Santa Clara",             stage:"Group", result:null,   done:false },
  { id:6,  date:"2026-06-13", timeET:"18:00", group:"C", home:"Brazil",       away:"Morocco",           venue:"MetLife Stadium, East Rutherford",         stage:"Group", result:null,   done:false },
  { id:7,  date:"2026-06-13", timeET:"21:00", group:"C", home:"Haiti",        away:"Scotland",          venue:"Gillette Stadium, Foxborough",             stage:"Group", result:null,   done:false },
  // June 14
  { id:8,  date:"2026-06-14", timeET:"00:00", group:"D", home:"Australia",    away:"Türkiye",           venue:"BC Place, Vancouver",                     stage:"Group", result:null,   done:false },
  { id:9,  date:"2026-06-14", timeET:"13:00", group:"E", home:"Germany",      away:"Curaçao",           venue:"NRG Stadium, Houston",                    stage:"Group", result:null,   done:false },
  { id:10, date:"2026-06-14", timeET:"16:00", group:"F", home:"Netherlands",  away:"Japan",             venue:"AT&T Stadium, Arlington",                 stage:"Group", result:null,   done:false },
  { id:11, date:"2026-06-14", timeET:"19:00", group:"E", home:"Ivory Coast",  away:"Ecuador",           venue:"Lincoln Financial Field, Philadelphia",    stage:"Group", result:null,   done:false },
  { id:12, date:"2026-06-14", timeET:"22:00", group:"F", home:"Sweden",       away:"Tunisia",           venue:"Estadio BBVA, Monterrey",                 stage:"Group", result:null,   done:false },
  // June 15
  { id:13, date:"2026-06-15", timeET:"12:00", group:"H", home:"Spain",        away:"Cape Verde",        venue:"Mercedes-Benz Stadium, Atlanta",          stage:"Group", result:null,   done:false },
  { id:14, date:"2026-06-15", timeET:"15:00", group:"G", home:"Belgium",      away:"Egypt",             venue:"Lumen Field, Seattle",                    stage:"Group", result:null,   done:false },
  { id:15, date:"2026-06-15", timeET:"18:00", group:"H", home:"Saudi Arabia", away:"Uruguay",           venue:"Hard Rock Stadium, Miami Gardens",         stage:"Group", result:null,   done:false },
  { id:16, date:"2026-06-15", timeET:"21:00", group:"G", home:"Iran",         away:"New Zealand",       venue:"SoFi Stadium, Inglewood",                 stage:"Group", result:null,   done:false },
  // June 16
  { id:17, date:"2026-06-16", timeET:"15:00", group:"I", home:"France",       away:"Senegal",           venue:"MetLife Stadium, East Rutherford",         stage:"Group", result:null,   done:false },
  { id:18, date:"2026-06-16", timeET:"18:00", group:"I", home:"Iraq",         away:"Norway",            venue:"Gillette Stadium, Foxborough",             stage:"Group", result:null,   done:false },
  { id:19, date:"2026-06-16", timeET:"21:00", group:"J", home:"Argentina",    away:"Algeria",           venue:"Arrowhead Stadium, Kansas City",           stage:"Group", result:null,   done:false },
  // June 17
  { id:20, date:"2026-06-17", timeET:"00:00", group:"J", home:"Austria",      away:"Jordan",            venue:"Levi's Stadium, Santa Clara",             stage:"Group", result:null,   done:false },
  { id:21, date:"2026-06-17", timeET:"13:00", group:"K", home:"Portugal",     away:"DR Congo",          venue:"NRG Stadium, Houston",                    stage:"Group", result:null,   done:false },
  { id:22, date:"2026-06-17", timeET:"16:00", group:"L", home:"England",      away:"Croatia",           venue:"AT&T Stadium, Arlington",                 stage:"Group", result:null,   done:false },
  { id:23, date:"2026-06-17", timeET:"19:00", group:"L", home:"Ghana",        away:"Panama",            venue:"BMO Field, Toronto",                      stage:"Group", result:null,   done:false },
  { id:24, date:"2026-06-17", timeET:"22:00", group:"K", home:"Uzbekistan",   away:"Colombia",          venue:"Estadio Azteca, Mexico City",             stage:"Group", result:null,   done:false },
  // June 18
  { id:25, date:"2026-06-18", timeET:"12:00", group:"A", home:"Czechia",      away:"South Africa",      venue:"Mercedes-Benz Stadium, Atlanta",          stage:"Group", result:null,   done:false },
  { id:26, date:"2026-06-18", timeET:"15:00", group:"B", home:"Switzerland",  away:"Bosnia & Herz.",    venue:"SoFi Stadium, Inglewood",                 stage:"Group", result:null,   done:false },
  { id:27, date:"2026-06-18", timeET:"18:00", group:"B", home:"Canada",       away:"Qatar",             venue:"BC Place, Vancouver",                     stage:"Group", result:null,   done:false },
  { id:28, date:"2026-06-18", timeET:"21:00", group:"A", home:"Mexico",       away:"South Korea",       venue:"Estadio Akron, Zapopan",                  stage:"Group", result:null,   done:false },
  // June 19
  { id:29, date:"2026-06-19", timeET:"15:00", group:"D", home:"USA",          away:"Australia",         venue:"Lumen Field, Seattle",                    stage:"Group", result:null,   done:false },
  { id:30, date:"2026-06-19", timeET:"18:00", group:"C", home:"Scotland",     away:"Morocco",           venue:"Gillette Stadium, Foxborough",             stage:"Group", result:null,   done:false },
  { id:31, date:"2026-06-19", timeET:"20:30", group:"C", home:"Brazil",       away:"Haiti",             venue:"Lincoln Financial Field, Philadelphia",    stage:"Group", result:null,   done:false },
  { id:32, date:"2026-06-19", timeET:"23:00", group:"D", home:"Türkiye",      away:"Paraguay",          venue:"Levi's Stadium, Santa Clara",             stage:"Group", result:null,   done:false },
  // June 20
  { id:33, date:"2026-06-20", timeET:"13:00", group:"F", home:"Netherlands",  away:"Sweden",            venue:"NRG Stadium, Houston",                    stage:"Group", result:null,   done:false },
  { id:34, date:"2026-06-20", timeET:"16:00", group:"E", home:"Germany",      away:"Ivory Coast",       venue:"BMO Field, Toronto",                      stage:"Group", result:null,   done:false },
  { id:35, date:"2026-06-20", timeET:"20:00", group:"E", home:"Ecuador",      away:"Curaçao",           venue:"Arrowhead Stadium, Kansas City",           stage:"Group", result:null,   done:false },
  // June 21
  { id:36, date:"2026-06-21", timeET:"00:00", group:"F", home:"Tunisia",      away:"Japan",             venue:"Estadio BBVA, Monterrey",                 stage:"Group", result:null,   done:false },
  { id:37, date:"2026-06-21", timeET:"12:00", group:"H", home:"Spain",        away:"Saudi Arabia",      venue:"Mercedes-Benz Stadium, Atlanta",          stage:"Group", result:null,   done:false },
  { id:38, date:"2026-06-21", timeET:"15:00", group:"G", home:"Belgium",      away:"Iran",              venue:"SoFi Stadium, Inglewood",                 stage:"Group", result:null,   done:false },
  { id:39, date:"2026-06-21", timeET:"18:00", group:"H", home:"Uruguay",      away:"Cape Verde",        venue:"Hard Rock Stadium, Miami Gardens",         stage:"Group", result:null,   done:false },
  { id:40, date:"2026-06-21", timeET:"21:00", group:"G", home:"New Zealand",  away:"Egypt",             venue:"BC Place, Vancouver",                     stage:"Group", result:null,   done:false },
  // June 22
  { id:41, date:"2026-06-22", timeET:"13:00", group:"J", home:"Argentina",    away:"Austria",           venue:"AT&T Stadium, Arlington",                 stage:"Group", result:null,   done:false },
  { id:42, date:"2026-06-22", timeET:"17:00", group:"I", home:"France",       away:"Iraq",              venue:"Lincoln Financial Field, Philadelphia",    stage:"Group", result:null,   done:false },
  { id:43, date:"2026-06-22", timeET:"20:00", group:"I", home:"Norway",       away:"Senegal",           venue:"MetLife Stadium, East Rutherford",         stage:"Group", result:null,   done:false },
  { id:44, date:"2026-06-22", timeET:"23:00", group:"J", home:"Jordan",       away:"Algeria",           venue:"Levi's Stadium, Santa Clara",             stage:"Group", result:null,   done:false },
  // June 23
  { id:45, date:"2026-06-23", timeET:"13:00", group:"K", home:"Portugal",     away:"Uzbekistan",        venue:"NRG Stadium, Houston",                    stage:"Group", result:null,   done:false },
  { id:46, date:"2026-06-23", timeET:"16:00", group:"L", home:"England",      away:"Ghana",             venue:"Gillette Stadium, Foxborough",             stage:"Group", result:null,   done:false },
  { id:47, date:"2026-06-23", timeET:"19:00", group:"L", home:"Panama",       away:"Croatia",           venue:"BMO Field, Toronto",                      stage:"Group", result:null,   done:false },
  { id:48, date:"2026-06-23", timeET:"22:00", group:"K", home:"Colombia",     away:"DR Congo",          venue:"Estadio Akron, Zapopan",                  stage:"Group", result:null,   done:false },
  // June 24
  { id:49, date:"2026-06-24", timeET:"15:00", group:"B", home:"Switzerland",  away:"Canada",            venue:"BC Place, Vancouver",                     stage:"Group", result:null,   done:false },
  { id:50, date:"2026-06-24", timeET:"15:00", group:"B", home:"Bosnia & Herz.",away:"Qatar",            venue:"Lumen Field, Seattle",                    stage:"Group", result:null,   done:false },
  { id:51, date:"2026-06-24", timeET:"18:00", group:"C", home:"Scotland",     away:"Brazil",            venue:"Hard Rock Stadium, Miami Gardens",         stage:"Group", result:null,   done:false },
  { id:52, date:"2026-06-24", timeET:"18:00", group:"C", home:"Morocco",      away:"Haiti",             venue:"Mercedes-Benz Stadium, Atlanta",          stage:"Group", result:null,   done:false },
  { id:53, date:"2026-06-24", timeET:"21:00", group:"A", home:"Czechia",      away:"Mexico",            venue:"Estadio Azteca, Mexico City",             stage:"Group", result:null,   done:false },
  { id:54, date:"2026-06-24", timeET:"21:00", group:"A", home:"South Africa", away:"South Korea",       venue:"Estadio BBVA, Monterrey",                 stage:"Group", result:null,   done:false },
  // June 25
  { id:55, date:"2026-06-25", timeET:"16:00", group:"E", home:"Curaçao",      away:"Ivory Coast",       venue:"Lincoln Financial Field, Philadelphia",    stage:"Group", result:null,   done:false },
  { id:56, date:"2026-06-25", timeET:"16:00", group:"E", home:"Ecuador",      away:"Germany",           venue:"MetLife Stadium, East Rutherford",         stage:"Group", result:null,   done:false },
  { id:57, date:"2026-06-25", timeET:"19:00", group:"F", home:"Japan",        away:"Sweden",            venue:"AT&T Stadium, Arlington",                 stage:"Group", result:null,   done:false },
  { id:58, date:"2026-06-25", timeET:"19:00", group:"F", home:"Tunisia",      away:"Netherlands",       venue:"Arrowhead Stadium, Kansas City",           stage:"Group", result:null,   done:false },
  { id:59, date:"2026-06-25", timeET:"22:00", group:"D", home:"Türkiye",      away:"USA",               venue:"SoFi Stadium, Inglewood",                 stage:"Group", result:null,   done:false },
  { id:60, date:"2026-06-25", timeET:"22:00", group:"D", home:"Paraguay",     away:"Australia",         venue:"Levi's Stadium, Santa Clara",             stage:"Group", result:null,   done:false },
  // June 26
  { id:61, date:"2026-06-26", timeET:"15:00", group:"I", home:"Norway",       away:"France",            venue:"Gillette Stadium, Foxborough",             stage:"Group", result:null,   done:false },
  { id:62, date:"2026-06-26", timeET:"15:00", group:"I", home:"Senegal",      away:"Iraq",              venue:"BMO Field, Toronto",                      stage:"Group", result:null,   done:false },
  { id:63, date:"2026-06-26", timeET:"20:00", group:"H", home:"Cape Verde",   away:"Saudi Arabia",      venue:"NRG Stadium, Houston",                    stage:"Group", result:null,   done:false },
  { id:64, date:"2026-06-26", timeET:"20:00", group:"H", home:"Uruguay",      away:"Spain",             venue:"Estadio Akron, Zapopan",                  stage:"Group", result:null,   done:false },
  { id:65, date:"2026-06-26", timeET:"23:00", group:"G", home:"Egypt",        away:"Iran",              venue:"Lumen Field, Seattle",                    stage:"Group", result:null,   done:false },
  { id:66, date:"2026-06-26", timeET:"23:00", group:"G", home:"New Zealand",  away:"Belgium",           venue:"BC Place, Vancouver",                     stage:"Group", result:null,   done:false },
  // June 27
  { id:67, date:"2026-06-27", timeET:"17:00", group:"L", home:"Panama",       away:"England",           venue:"MetLife Stadium, East Rutherford",         stage:"Group", result:null,   done:false },
  { id:68, date:"2026-06-27", timeET:"17:00", group:"L", home:"Croatia",      away:"Ghana",             venue:"Lincoln Financial Field, Philadelphia",    stage:"Group", result:null,   done:false },
  { id:69, date:"2026-06-27", timeET:"19:30", group:"K", home:"Colombia",     away:"Portugal",          venue:"Hard Rock Stadium, Miami Gardens",         stage:"Group", result:null,   done:false },
  { id:70, date:"2026-06-27", timeET:"19:30", group:"K", home:"DR Congo",     away:"Uzbekistan",        venue:"Mercedes-Benz Stadium, Atlanta",          stage:"Group", result:null,   done:false },
  { id:71, date:"2026-06-27", timeET:"22:00", group:"J", home:"Algeria",      away:"Austria",           venue:"Arrowhead Stadium, Kansas City",           stage:"Group", result:null,   done:false },
  { id:72, date:"2026-06-27", timeET:"22:00", group:"J", home:"Jordan",       away:"Argentina",         venue:"AT&T Stadium, Arlington",                 stage:"Group", result:null,   done:false },
  // Round of 32 (teams TBD)
  { id:73, date:"2026-06-28", timeET:"15:00", group:"", home:"Runner-up A",   away:"Runner-up B",       venue:"SoFi Stadium, Inglewood",                 stage:"Round of 32", result:null, done:false },
  { id:74, date:"2026-06-29", timeET:"16:30", group:"", home:"Winner E",      away:"Best 3rd (A/B/C/D/F)",venue:"Gillette Stadium, Foxborough",           stage:"Round of 32", result:null, done:false },
  { id:75, date:"2026-06-29", timeET:"21:00", group:"", home:"Winner F",      away:"Runner-up C",       venue:"Estadio BBVA, Monterrey",                 stage:"Round of 32", result:null, done:false },
  { id:76, date:"2026-06-29", timeET:"13:00", group:"", home:"Winner C",      away:"Runner-up F",       venue:"NRG Stadium, Houston",                    stage:"Round of 32", result:null, done:false },
  { id:77, date:"2026-06-30", timeET:"17:00", group:"", home:"Winner I",      away:"Best 3rd (C/D/F/G/H)",venue:"MetLife Stadium, East Rutherford",       stage:"Round of 32", result:null, done:false },
  { id:78, date:"2026-06-30", timeET:"13:00", group:"", home:"Runner-up E",   away:"Runner-up I",       venue:"AT&T Stadium, Arlington",                 stage:"Round of 32", result:null, done:false },
  { id:79, date:"2026-06-30", timeET:"21:00", group:"", home:"Winner A",      away:"Best 3rd (C/E/F/H/I)",venue:"Estadio Azteca, Mexico City",            stage:"Round of 32", result:null, done:false },
  { id:80, date:"2026-07-01", timeET:"12:00", group:"", home:"Winner L",      away:"Best 3rd (E/H/I/J/K)",venue:"Mercedes-Benz Stadium, Atlanta",         stage:"Round of 32", result:null, done:false },
  { id:81, date:"2026-07-01", timeET:"20:00", group:"", home:"Winner D",      away:"Best 3rd (B/E/F/I/J)",venue:"Levi's Stadium, Santa Clara",            stage:"Round of 32", result:null, done:false },
  { id:82, date:"2026-07-01", timeET:"16:00", group:"", home:"Winner G",      away:"Best 3rd (A/E/H/I/J)",venue:"Lumen Field, Seattle",                   stage:"Round of 32", result:null, done:false },
  { id:83, date:"2026-07-02", timeET:"19:00", group:"", home:"Runner-up K",   away:"Runner-up L",       venue:"BMO Field, Toronto",                      stage:"Round of 32", result:null, done:false },
  { id:84, date:"2026-07-02", timeET:"15:00", group:"", home:"Winner H",      away:"Runner-up J",       venue:"SoFi Stadium, Inglewood",                 stage:"Round of 32", result:null, done:false },
  { id:85, date:"2026-07-02", timeET:"23:00", group:"", home:"Winner B",      away:"Best 3rd (E/F/G/I/J)",venue:"BC Place, Vancouver",                    stage:"Round of 32", result:null, done:false },
  { id:86, date:"2026-07-03", timeET:"18:00", group:"", home:"Winner J",      away:"Runner-up H",       venue:"Hard Rock Stadium, Miami Gardens",         stage:"Round of 32", result:null, done:false },
  { id:87, date:"2026-07-03", timeET:"21:30", group:"", home:"Winner K",      away:"Best 3rd (D/E/I/J/L)",venue:"Arrowhead Stadium, Kansas City",          stage:"Round of 32", result:null, done:false },
  { id:88, date:"2026-07-03", timeET:"14:00", group:"", home:"Runner-up D",   away:"Runner-up G",       venue:"AT&T Stadium, Arlington",                 stage:"Round of 32", result:null, done:false },
  // Round of 16
  { id:89,  date:"2026-07-04", timeET:"15:00", group:"", home:"TBD", away:"TBD", venue:"MetLife Stadium, East Rutherford",   stage:"Round of 16", result:null, done:false },
  { id:90,  date:"2026-07-04", timeET:"20:00", group:"", home:"TBD", away:"TBD", venue:"AT&T Stadium, Arlington",            stage:"Round of 16", result:null, done:false },
  { id:91,  date:"2026-07-05", timeET:"15:00", group:"", home:"TBD", away:"TBD", venue:"SoFi Stadium, Inglewood",            stage:"Round of 16", result:null, done:false },
  { id:92,  date:"2026-07-05", timeET:"20:00", group:"", home:"TBD", away:"TBD", venue:"NRG Stadium, Houston",               stage:"Round of 16", result:null, done:false },
  { id:93,  date:"2026-07-06", timeET:"15:00", group:"", home:"TBD", away:"TBD", venue:"Gillette Stadium, Foxborough",       stage:"Round of 16", result:null, done:false },
  { id:94,  date:"2026-07-06", timeET:"20:00", group:"", home:"TBD", away:"TBD", venue:"Levi's Stadium, Santa Clara",        stage:"Round of 16", result:null, done:false },
  { id:95,  date:"2026-07-07", timeET:"15:00", group:"", home:"TBD", away:"TBD", venue:"Mercedes-Benz Stadium, Atlanta",     stage:"Round of 16", result:null, done:false },
  { id:96,  date:"2026-07-07", timeET:"20:00", group:"", home:"TBD", away:"TBD", venue:"Lumen Field, Seattle",               stage:"Round of 16", result:null, done:false },
  // QF
  { id:97,  date:"2026-07-09", timeET:"15:00", group:"", home:"TBD", away:"TBD", venue:"SoFi Stadium, Inglewood",            stage:"Quarterfinal", result:null, done:false },
  { id:98,  date:"2026-07-09", timeET:"20:00", group:"", home:"TBD", away:"TBD", venue:"MetLife Stadium, East Rutherford",   stage:"Quarterfinal", result:null, done:false },
  { id:99,  date:"2026-07-10", timeET:"15:00", group:"", home:"TBD", away:"TBD", venue:"AT&T Stadium, Arlington",            stage:"Quarterfinal", result:null, done:false },
  { id:100, date:"2026-07-11", timeET:"15:00", group:"", home:"TBD", away:"TBD", venue:"NRG Stadium, Houston",               stage:"Quarterfinal", result:null, done:false },
  // SF
  { id:101, date:"2026-07-14", timeET:"15:00", group:"", home:"TBD", away:"TBD", venue:"MetLife Stadium, East Rutherford",   stage:"Semifinal", result:null, done:false },
  { id:102, date:"2026-07-15", timeET:"15:00", group:"", home:"TBD", away:"TBD", venue:"SoFi Stadium, Inglewood",            stage:"Semifinal", result:null, done:false },
  // 3rd place + Final
  { id:103, date:"2026-07-18", timeET:"15:00", group:"", home:"TBD", away:"TBD", venue:"Hard Rock Stadium, Miami Gardens",   stage:"3rd Place", result:null, done:false },
  { id:104, date:"2026-07-19", timeET:"15:00", group:"", home:"TBD", away:"TBD", venue:"MetLife Stadium, East Rutherford",   stage:"Final", result:null, done:false },
];

const TIMEZONES = [
  { label:"ET (New York)",      tz:"America/New_York" },
  { label:"CT (Chicago)",       tz:"America/Chicago" },
  { label:"MT (Denver)",        tz:"America/Denver" },
  { label:"PT (Los Angeles)",   tz:"America/Los_Angeles" },
  { label:"GMT (London)",       tz:"Europe/London" },
  { label:"CET (Paris/Berlin)", tz:"Europe/Paris" },
  { label:"IST (Mumbai)",       tz:"Asia/Kolkata" },
  { label:"JST (Tokyo)",        tz:"Asia/Tokyo" },
  { label:"AEST (Sydney)",      tz:"Australia/Sydney" },
  { label:"BRT (São Paulo)",    tz:"America/Sao_Paulo" },
];

const TEAM_FLAG_CODES: Record<string, string> = {
  "Mexico":"mx","South Africa":"za","South Korea":"kr","Czechia":"cz",
  "Canada":"ca","Bosnia & Herz.":"ba","USA":"us","Paraguay":"py",
  "Qatar":"qa","Switzerland":"ch","Brazil":"br","Morocco":"ma",
  "Haiti":"ht","Scotland":"gb-sct","Australia":"au","Türkiye":"tr",
  "Germany":"de","Curaçao":"cw","Netherlands":"nl","Japan":"jp",
  "Ivory Coast":"ci","Ecuador":"ec","Sweden":"se","Tunisia":"tn",
  "Spain":"es","Cape Verde":"cv","Belgium":"be","Egypt":"eg",
  "Saudi Arabia":"sa","Uruguay":"uy","Iran":"ir","New Zealand":"nz",
  "France":"fr","Senegal":"sn","Iraq":"iq","Norway":"no",
  "Argentina":"ar","Algeria":"dz","Austria":"at","Jordan":"jo",
  "Portugal":"pt","DR Congo":"cd","England":"gb-eng","Croatia":"hr",
  "Ghana":"gh","Panama":"pa","Uzbekistan":"uz","Colombia":"co",
  "Bosnia and Herzegovina":"ba","Bosnia & Herzegovina":"ba",
};

const STAGE_COLORS: Record<string, string> = {
  "Group":"#1a6b3c","Round of 32":"#1a4a8a","Round of 16":"#6b1a6b",
  "Quarterfinal":"#8a4a00","Semifinal":"#8a0000","3rd Place":"#555","Final":"#c8a000",
};

type Match = (typeof MATCHES)[number];

function formatLocalTime(dateStr: string, timeET: string, tz: string) {
  const [h, m] = timeET.split(":").map(Number);
  const utcMs = new Date(`${dateStr}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00Z`).getTime() + 4 * 60 * 60 * 1000;
  const utcDate = new Date(utcMs);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour:"numeric", minute:"2-digit", hour12:true,
  }).format(utcDate);
}

function formatLocalDate(dateStr: string, timeET: string, tz: string) {
  const [h, m] = timeET.split(":").map(Number);
  const utcMs = new Date(`${dateStr}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00Z`).getTime() + 4 * 60 * 60 * 1000;
  const utcDate = new Date(utcMs);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday:"short", month:"short", day:"numeric",
  }).format(utcDate);
}

function getLocalDateKey(dateStr: string, timeET: string, tz: string) {
  const [h, m] = timeET.split(":").map(Number);
  const utcMs = new Date(`${dateStr}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00Z`).getTime() + 4 * 60 * 60 * 1000;
  const utcDate = new Date(utcMs);
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year:"numeric", month:"2-digit", day:"2-digit" }).format(utcDate);
}

function getMatchKickoffMs(dateStr: string, timeET: string) {
  const [h, m] = timeET.split(":").map(Number);
  return new Date(`${dateStr}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00Z`).getTime() + 4 * 60 * 60 * 1000;
}

function formatCountdown(ms: number) {
  if (ms <= 0) return "0s";
  const totalSec = Math.floor(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  if (days > 0) return `${days}d ${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h ${mins}m ${secs}s`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

export default function App() {
  const [selectedTZ, setSelectedTZ] = useState("America/Los_Angeles");
  const [search, setSearch] = useState("");
  const [viewDate, setViewDate] = useState<string | null>(null);

  const todayLocal = useMemo(() => {
    const now = new Date();
    return new Intl.DateTimeFormat("en-CA", { timeZone: selectedTZ, year:"numeric", month:"2-digit", day:"2-digit" }).format(now);
  }, [selectedTZ]);

  const activeDateKey = viewDate || todayLocal;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MATCHES.filter(m => {
      if (q) {
        return (
          m.home.toLowerCase().includes(q) ||
          m.away.toLowerCase().includes(q) ||
          m.venue.toLowerCase().includes(q)
        );
      }
      const localKey = getLocalDateKey(m.date, m.timeET, selectedTZ);
      return localKey === activeDateKey;
    });
  }, [search, selectedTZ, activeDateKey]);

  const grouped = useMemo(() => {
    const map: Record<string, Match[]> = {};
    filtered.forEach(m => {
      const key = getLocalDateKey(m.date, m.timeET, selectedTZ);
      if (!map[key]) map[key] = [];
      map[key].push(m);
    });
    return Object.entries(map).sort(([a],[b]) => a.localeCompare(b));
  }, [filtered, selectedTZ]);

  const allDates = useMemo(() => {
    const set = new Set<string>();
    MATCHES.forEach(m => set.add(getLocalDateKey(m.date, m.timeET, selectedTZ)));
    return Array.from(set).sort();
  }, [selectedTZ]);

  const todayHasMatches = allDates.includes(todayLocal);
  const activeDate = viewDate || (todayHasMatches ? todayLocal : allDates.find(d => d >= todayLocal) || allDates[0]);
  const tzLabel = TIMEZONES.find(t => t.tz === selectedTZ)?.label || selectedTZ;

  return (
    <div className="app">
      <div className="app-bg" aria-hidden="true" />

      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-icon">
              <SoccerBallIcon size={26} color="#6ee7ff" />
            </div>
            <div>
              <div className="brand-label">FIFA</div>
              <div className="brand-title">World Cup 2026</div>
            </div>
          </div>

          <div className="controls">
            <select
              className="glass-select"
              value={selectedTZ}
              onChange={e => { setSelectedTZ(e.target.value); setViewDate(null); }}
            >
              {TIMEZONES.map(t => <option key={t.tz} value={t.tz}>{t.label}</option>)}
            </select>

            <div className="search-wrap">
              <SearchIcon size={15} color="rgba(255,255,255,0.35)" />
              <input
                className="glass-input"
                type="text"
                placeholder="Search country or venue…"
                value={search}
                onChange={e => { setSearch(e.target.value); setViewDate(null); }}
              />
            </div>
            {search && (
              <button className="glass-btn" onClick={() => setSearch("")}>
                <CloseIcon size={12} color="#6ee7ff" />
                Clear
              </button>
            )}
          </div>

          {!search && (
            <div className="date-nav">
              {allDates.map(d => {
                const isToday = d === todayLocal;
                const isActive = activeDate === d;
                const label = new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { month:"short", day:"numeric" });
                return (
                  <button
                    key={d as string}
                    className={[
                      "date-pill",
                      isToday && "date-pill--today",
                      isActive && "date-pill--active",
                    ].filter(Boolean).join(" ")}
                    onClick={() => setViewDate(d as string)}
                  >
                    {isToday ? "Today" : label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      <main className="main">
        {grouped.length === 0 && (
          <div className="empty">
            <div className="empty-icon">
              <SoccerBallIcon size={52} color="#6ee7ff" />
            </div>
            <div className="empty-text">
              No matches found{search ? ` for "${search}"` : " on this date"}.
            </div>
          </div>
        )}

        {grouped.map(([dateKey, matches]) => (
          <div key={dateKey}>
            <div className="section-header">
              <div className="section-line" />
              <div className="section-label">
                {formatLocalDate(matches[0].date, matches[0].timeET, selectedTZ)} · {tzLabel}
                {dateKey === todayLocal && <span className="badge-today">TODAY</span>}
              </div>
              <div className="section-line" />
            </div>

            <div className="match-list">
              {matches.map(m => (
                <MatchCard key={m.id} match={m} tz={selectedTZ} showTimer={dateKey === todayLocal} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

function MatchCard({ match: m, tz, showTimer }: { match: Match, tz: string, showTimer?: boolean }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!showTimer || m.done) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [showTimer, m.done]);

  const stageColor = STAGE_COLORS[m.stage] || "#1a6b3c";
  const localTime = formatLocalTime(m.date, m.timeET, tz);
  const kickoffMs = getMatchKickoffMs(m.date, m.timeET);
  const msUntilKickoff = kickoffMs - now;
  const isLive = showTimer && !m.done && msUntilKickoff <= 0;
  const homeFlagCode = TEAM_FLAG_CODES[m.home];
  const awayFlagCode = TEAM_FLAG_CODES[m.away];
  const isFinal = m.stage === "Final";
  const isTBD = m.home.startsWith("TBD") || m.home.startsWith("Runner") || m.home.startsWith("Winner") || m.home.startsWith("Best");

  const cardClass = [
    "match-card",
    isFinal && "match-card--final",
    isLive && "match-card--live",
    m.done && "match-card--done",
  ].filter(Boolean).join(" ");

  const timeClass = [
    "match-time",
    m.done && "match-time--done",
    isLive && "match-time--live",
    !m.done && !isLive && "match-time--upcoming",
  ].filter(Boolean).join(" ");

  return (
    <div className={cardClass}>
      <div className="match-top">
        <div className="match-badges">
          <span className="stage-badge" style={{ background: stageColor }}>
            {m.stage}{m.group ? ` · Group ${m.group}` : ""}
          </span>
          {m.done && <span className="ft-badge">FT</span>}
        </div>
        <div className={timeClass}>
          {!m.done && (
            <ClockIcon size={14} color={isLive ? "#ff6b8a" : "#6ee7ff"} />
          )}
          <span>{m.done ? "Full Time" : localTime}</span>
          {showTimer && !m.done && (
            isLive ? (
              <span className="timer-badge timer-badge--live">
                <LiveDotIcon size={7} color="#ff6b8a" />
                LIVE
              </span>
            ) : (
              <span className="timer-badge timer-badge--countdown">
                <TimerIcon size={12} color="#6ee7ff" />
                {formatCountdown(msUntilKickoff)}
              </span>
            )
          )}
        </div>
      </div>

      {isTBD ? (
        <div className="tbd-row">
          <HourglassIcon size={16} color="rgba(255,255,255,0.45)" />
          Teams TBD
        </div>
      ) : (
        <div className="teams">
          <div className="team">
            <div className="team-flag">
              <CountryFlag code={homeFlagCode} size={40} />
            </div>
            <div className="team-name">{m.home}</div>
          </div>

          <div className="score-box">
            {m.result ? (
              <div className="score">{m.result}</div>
            ) : (
              <div className="vs">VS</div>
            )}
          </div>

          <div className="team">
            <div className="team-flag">
              <CountryFlag code={awayFlagCode} size={40} />
            </div>
            <div className="team-name">{m.away}</div>
          </div>
        </div>
      )}

      <div className="venue">
        <MapPinIcon size={14} color="rgba(255,255,255,0.45)" />
        <span>{m.venue}</span>
      </div>
    </div>
  );
}