import React from 'react';
import { SlidersHorizontal, ChevronUp } from 'lucide-react';
const colors=[['Brown','#bd8b62'],['White','#ffffff'],['Pink','#ff8fb5'],['Purple','#9365ca'],['Blue','#278bdf'],['Red','#e50032'],['Yellow','#ffc83b'],['Green','#19a36d'],['Black & White','#35465b'],['Multicolor','conic-gradient(#ff75ab,#ffd43b,#54c7e9,#9c66d4,#ff75ab)']];
const groups=[['Classic Bears','Bear'],['Animals','Bunny'],['Characters','Character'],['Seasonal','Seasonal'],['Limited Edition','Limited Edition']];
export default function BearFilters({filters,setFilters,clear}){
 const toggle=(key,val)=>setFilters(prev=>({...prev,[key]:prev[key].includes(val)?prev[key].filter(v=>v!==val):[...prev[key],val]}));
 return <aside className="filters"><div className="filter-title"><SlidersHorizontal size={23}/><strong>Filters</strong><button onClick={clear}>Clear</button></div>
 <div className="filter-section"><h3>Year <ChevronUp size={16}/></h3>{['2026','2025','2024','2023','2022','Older','Unknown'].map(y=><label className="check-line" key={y}><input type="checkbox" checked={filters.years.includes(y)} onChange={()=>toggle('years',y)}/>{y}</label>)}</div>
 <div className="filter-section"><h3>Plush Type <ChevronUp size={16}/></h3>{groups.map(([label,val])=><label className="check-line" key={label}><input type="checkbox" checked={filters.types.includes(val)} onChange={()=>toggle('types',val)}/>{label}</label>)}</div>
 <div className="filter-section"><h3>Color <ChevronUp size={16}/></h3><div className="swatches">{colors.map(([name,background])=><button key={name} className={'swatch '+(filters.colors.includes(name)?'active':'')} title={name} aria-label={'Filter color '+name} aria-pressed={filters.colors.includes(name)} style={{background}} onClick={()=>toggle('colors',name)}/>)}</div></div>
 <div className="filter-section"><h3>Size <ChevronUp size={16}/></h3>{[['Small (12 in)','Small'],['Medium (16 in)','Medium'],['Large (20 in)','Large']].map(([label,val])=><label className="check-line" key={val}><input type="checkbox" checked={filters.sizes.includes(val)} onChange={()=>toggle('sizes',val)}/>{label}</label>)}</div>
 </aside>;
}
