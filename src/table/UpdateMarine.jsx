import {useState} from "react";
import {fetchUpdateById} from "../utils/spaceMarinesApi";

const UpdateMarine = ({updateContent, alertWithMessage}) => {

    const [id, setId] = useState("")
    const [name, setName] = useState("romka")
    const [coordinates, setCoordinates] = useState({x: 1, y: 1})
    const [health, setHealth] = useState(1)
    const [category, setCategory] = useState("SCOUT")
    const [weaponType, setWeaponType] = useState("HEAVY_BOLTGUN")
    const [meleeWeapon, setMeleeWeapon] = useState("CHAIN_SWORD")
    const [chapter, setChapter] = useState(
        {
            name: "chipi",
            parentLegion: null,
            marinesCount: 1,
            world: null
        }
    )

    const onUpdateButtonClick = () => {
        fetchUpdateById(id, { spaceMarineRequestDto : {
                name: name,
                coordinates: coordinates,
                health: health,
                category: category,
                weaponType: weaponType,
                meleeWeapon:meleeWeapon,
                chapterRequestDto: chapter,
            }}, alertWithMessage).then(() => updateContent())
    }

    return <details className="dropdown">
        <summary className="m-1 btn">Update marine</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <div>
                <div>
                    <label htmlFor="idArea">id</label>
                    <input type="number" id={"idArea"} value={id} onChange={e => setId(e.target.value)} placeholder={"id"}/>
                    <label htmlFor="nameArea">name</label>
                    <textarea id={"nameArea"} value={name} onChange={e => setName(e.target.value)} placeholder={"name"}/>
                    <label htmlFor="xArea">coordinates.x</label>
                    <input type="number" id={"xArea"} value={coordinates.x} onChange={e => setCoordinates({x: e.target.value, y: coordinates.y})}
                           placeholder={"coordinates.x"}/>
                    <label htmlFor="yArea">coordinates.y</label>
                    <input type="number" id={"yArea"} value={coordinates.y} onChange={e => setCoordinates({x: coordinates.x, y: e.target.value})}
                           placeholder={"coordinates.y"}/>
                    <label htmlFor="healthArea">health</label>
                    <input type="number" id={"healthArea"} value={health} onChange={e => setHealth(e.target.value)} placeholder={"area"}/>
                    <label htmlFor="categoryArea">category</label>
                    <select className='select' onChange={(e) => setCategory(e.target.value)} value={category} required>
                        {['SCOUT', 'TACTICAL', 'TERMINATOR', 'CHAPLAIN', 'HELIX'].map((enumCategory) => {
                            return (
                                <option value={enumCategory} key={enumCategory}>{enumCategory}</option>
                            )
                        })}
                    </select><br/>

                    <label htmlFor="weaponTypeArea">weaponType</label>
                    <select className='select' onChange={(e) => setWeaponType(e.target.value)} value={weaponType} required>
                        {['HEAVY_BOLTGUN', 'MELTAGUN', 'COMBI_PLASMA_GUN', 'INFERNO_PISTOL', 'MULTI_MELTA'].map((enumWeaponType) => {
                            return (
                                <option value={enumWeaponType} key={enumWeaponType}>{enumWeaponType}</option>
                            )
                        })}
                    </select><br/>

                    <label htmlFor="meleeWeaponArea">meleeWeapon</label>
                    <select className='select' onChange={(e) => setMeleeWeapon(e.target.value)} value={meleeWeapon} required>
                        {['CHAIN_SWORD', 'POWER_SWORD', 'LIGHTING_CLAW', 'POWER_FIST'].map((meleeWeaponType) => {
                            return (
                                <option value={meleeWeaponType} key={meleeWeaponType}>{meleeWeaponType}</option>
                            )
                        })}
                    </select><br/>

                    <label htmlFor="chapterNameArea">chapter.name</label>
                    <textarea id={"chapterNameArea"} value={chapter.name} onChange={e => setChapter({
                        name: e.target.value,
                        parentLegion: chapter.parentLegion,
                        marinesCount: chapter.marinesCount,
                        world: chapter.world,
                    })} placeholder={"chapter.name"}/>

                    <label htmlFor="chapterParentLegionArea">chapter.parentLegion</label>
                    <textarea id={"chapterParentLegionArea"} value={chapter.parentLegion} onChange={e => setChapter({
                        name: chapter.name,
                        parentLegion: e.target.value,
                        marinesCount: chapter.marinesCount,
                        world: chapter.world,
                    })} placeholder={"chapter.parentLegion"}/>

                    <label htmlFor="chapterMarinesCountArea">chapter.marinesCount</label>
                    <textarea id={"chapterMarinesCountArea"} value={chapter.marinesCount} onChange={e => setChapter({
                        name: chapter.name,
                        parentLegion: chapter.parentLegion,
                        marinesCount: e.target.value,
                        world: chapter.world,
                    })} placeholder={"chapter.marinesCount"}/>

                    <label htmlFor="chapterWorldArea">chapter.world</label>
                    <textarea id={"chapterWorldArea"} value={chapter.world} onChange={e => setChapter({
                        name: chapter.name,
                        parentLegion: chapter.parentLegion,
                        marinesCount: chapter.marinesCount,
                        world: e.target.value,
                    })} placeholder={"chapter.world"}/>
                </div>
                <button className={"btn btn-outline btn-success"} onClick={onUpdateButtonClick}>Update</button>
            </div>
        </ul>
    </details>
}

export default UpdateMarine
