import React from 'react';
import {cities, work} from '../../data/data';
import style from './Service.module.css'
import {
    addAddressAC,
    addCityAC,
    addDescriptionAC,
    addPriceAC,
    addWorkUnitAC,
    changeAddressAC,
    IAddress,
    isCallAC,
    isHasPhotoAC,
    isHasReviewAC,
    isVerifiedOnlyAC, IWorkUnit, removeAddressAC
} from "../../redux/ticket-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";


export function Service() {

    const state = useSelector<AppRootStateType, AppRootStateType>(state => state) // удалить
    // удалить
    // удалить


    const description = useSelector<AppRootStateType, string>(state => state.ticket.description)
    const city = useSelector<AppRootStateType, string>(state => state.ticket.city.text)
    const call = useSelector<AppRootStateType, boolean>(state => state.ticket.call)
    const price_to = useSelector<AppRootStateType, number | null>(state => state.ticket.price_to)
    const verified_only = useSelector<AppRootStateType, boolean>(state => state.ticket.verified_only)
    const has_photo = useSelector<AppRootStateType, boolean>(state => state.ticket.has_photo)
    const has_review = useSelector<AppRootStateType, boolean>(state => state.ticket.has_review)
    const work_unit = useSelector<AppRootStateType, IWorkUnit | null>(state => state.ticket.work_unit)
    let addresses = useSelector<AppRootStateType, IAddress[]>(state => state.ticket.addresses)
    const dispatch = useDispatch()

    return (
        <>
            <h3>
                О заявке
            </h3>
            <div className={style.description}>
                <div className={style.name}>Описание</div>
                <textarea value={description}
                          className={style.textarea_description}
                          onChange={(e) => dispatch(addDescriptionAC(e.currentTarget.value))}
                />

            </div>
            <div className={style.city}>
                <div className={style.name}>Город заявки</div>
                <select value={city}
                        className={style.select_city}
                        onChange={(e) => {
                            let cityObj = cities.filter(c => c.text === e.target.value)[0]
                            dispatch(addCityAC(cityObj))
                        }}>
                    {cities.map((c, index) => {
                        return <option key={index}>{c.text}</option>
                    })}
                </select>
            </div>

            <div>
                <div className={style.address}>
                    <div className={style.name}>Адрес</div>
                    <div className={style.address_block}>
                        {addresses.map(a => {
                            return (
                                <div className={style.address_form}>
                                    <div
                                        className={style.address_city}>{a.city?.text ? a.city?.text : "Город заявки"}</div>
                                    <input value={a.address}
                                           size={98}
                                           className={style.input_address}
                                           onChange={(e) => dispatch(changeAddressAC(a.id, e.target.value))}/>
                                    <button
                                        className={style.button}
                                        onClick={() => dispatch(removeAddressAC(a.id))}>x
                                    </button>
                                </div>
                            )
                        })}
                        <button
                            className={style.button_add_address}
                            onClick={() => dispatch(addAddressAC())}>Добавить адрес
                        </button>
                    </div>
                </div>

            </div>

            <div className={style.communication}>
                <div className={style.name}>Способ связи</div>
                <select value={call ? "Позвонить" : "Написать в чате"}
                        className={style.call}
                        onChange={(e) => dispatch(isCallAC(e.target.value === "Позвонить"))}
                >
                    <option key={101}>Написать в чате</option>
                    <option key={202}>Позвонить</option>
                </select>
            </div>
            <div className={style.price}>
                <div className={style.name}>Сколько готовы заплатить</div>
                <input
                    className={style.input_price}
                    type={"number"}
                    value={price_to === null ? '' : price_to}
                    onChange={(e) => dispatch(addPriceAC(+e.target.value))}
                />
                <select value={work_unit === null ? work[0].text : work_unit.text}
                        className={style.work_unit}
                        onChange={(e) => {
                            let workObj = work.filter(w => w.text === e.target.value)[0]
                            dispatch(addWorkUnitAC(workObj))
                        }}
                >
                    {work.map((c, index) => {
                        return <option key={index}>{c.text}</option>
                    })}
                </select>
            </div>
            <div className={style.requirements}>
                <div className={style.name}>Требование к специалистам</div>
                <div className={style.checkbox_requirements}>
                    <div>
                        <input type={"checkbox"}
                               checked={verified_only}
                               onChange={() => dispatch(isVerifiedOnlyAC(!verified_only))}
                        /><span>Личность подтверждена</span>
                    </div>
                    <div>
                        <input
                            type={"checkbox"}
                            checked={has_photo}
                            onChange={() => dispatch(isHasPhotoAC(!has_photo))}
                        /><span>С фото работ в анкете</span>
                    </div>
                    <div>
                        <input type={"checkbox"}
                               checked={has_review}
                               onChange={() => dispatch(isHasReviewAC(!has_review))}
                        /><span>С отзывами</span>
                    </div>
                </div>
            </div>
            <button onClick={() => console.log(state)}>state</button>
        </>
    )
}

