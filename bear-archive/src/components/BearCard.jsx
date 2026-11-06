import React, { useState } from 'react';
import { Heart, ImagePlus } from 'lucide-react';
export default function BearCard({bear,favorite,toggleFavorite}){
 const [broken,setBroken]=useState(false);
 return <article className="bear-card"><button className={'heart '+(favorite?'active':'')} aria-label={favorite?'Remove favorite':'Add favorite'} onClick={()=>toggleFavorite(bear.id)}><Heart size={27} strokeWidth={2.3} fill={favorite?'currentColor':'none'}/></button><div className="bear-image">{bear.image&&!broken?<img src={bear.image} alt={bear.name} onError={()=>setBroken(true)}/>:<div className="placeholder"><span>🧸</span><ImagePlus size={18}/><small>PHOTO COMING SOON</small></div>}</div><div className="bear-info"><h3>{bear.name}</h3><p>{bear.year?`Released ${bear.year}`:'Year coming soon'}</p><details><summary>Details</summary><p>{bear.description||'Description coming soon.'}</p>{bear.source&&<a href={bear.source} target="_blank" rel="noreferrer">Source</a>}</details></div></article>;
}
