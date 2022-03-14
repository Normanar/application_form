import React from "react";
import style from "./Vacancy.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {
    addAddressVacancyAC,
    addCityVacancyAC,
    addDescriptionVacancyAC,
    addExperienceAC,
    addPriceFromAC,
    addPriceToAC,
    addTitleAC,
    changeAddressVacancyAC,
    IAddress,
    removeAddressVacancyAC
} from "../../redux/vacancy-reducer";
import {cities, experienceVacancy} from "../../data/data";
import {NavLink} from "react-router-dom";

export function Vacancy() {

    const title = useSelector<AppRootStateType, string>(state => state.vacancy.title)
    const descriptionVacancy = useSelector<AppRootStateType, string>(state => state.vacancy.description)
    const cityVacancy = useSelector<AppRootStateType, string>(state => state.vacancy.city.text)
    const addressesVacancy = useSelector<AppRootStateType, IAddress[]>(state => state.vacancy.addresses)
    const price_from = useSelector<AppRootStateType, number | null>(state => state.vacancy.price_from)
    const price_to = useSelector<AppRootStateType, number | null>(state => state.vacancy.price_to)
    const dispatch = useDispatch()

    return (
        <>
            <NavLink to={"/"} className={style.nav}>На главную</NavLink>
            <h3>
                О заявке
            </h3>
            <div className={style.title}>
                <div className={style.name}>Название вакансии</div>
                <input value={title}
                       className={style.input_title}
                       onChange={(e) => dispatch(addTitleAC(e.currentTarget.value))}
                />

            </div>

            <div className={style.description_vacancy}>
                <div className={style.name}>Обязанности, требования, условия</div>
                <textarea value={descriptionVacancy}
                          className={style.textarea_description_vacancy}
                          onChange={(e) => dispatch(addDescriptionVacancyAC(e.currentTarget.value))}
                />

            </div>

            <div className={style.city_vacancy}>
                <div className={style.name}>Город вакансии</div>
                <select value={cityVacancy}
                        className={style.select_city_vacancy}
                        onChange={(e) => {
                            let cityObj = cities.filter(c => c.text === e.target.value)[0]
                            dispatch(addCityVacancyAC(cityObj))
                        }}>
                    {cities.map((c, index) => {
                        return <option key={index}>{c.text}</option>
                    })}
                </select>
            </div>


            <div className={style.address_vacancy}>
                <div className={style.name}>Адрес</div>
                <div className={style.address_vacancy_block}>
                    {addressesVacancy.map(a => {
                        return (
                            <div className={style.address_vacancy_form}>
                                <div
                                    className={style.address_vacancy_city}>{a.city?.text ? a.city?.text : "Город вакансии"}</div>
                                <input value={a.address}
                                       size={98}
                                       className={style.input_address}
                                       onChange={(e) => dispatch(changeAddressVacancyAC(a.id, e.target.value))}/>
                                <button
                                    className={style.button}
                                    onClick={() => dispatch(removeAddressVacancyAC(a.id))}>x
                                </button>
                            </div>
                        )
                    })}
                    <button
                        className={style.button_add_address}
                        onClick={() => dispatch(addAddressVacancyAC())}>Добавить адрес
                    </button>
                </div>
            </div>

            <div className={style.salary}>
                <div className={style.name}>Зарплата</div>
                <input
                    className={style.input_salary}
                    placeholder={"От"}
                    type={"number"}
                    value={price_from === null ? '' : price_from}
                    onChange={(e) => dispatch(addPriceFromAC(+e.target.value))}
                />
                <input
                    className={style.input_salary}
                    placeholder={"До"}
                    type={"number"}
                    value={price_to === null ? '' : price_to}
                    onChange={(e) => dispatch(addPriceToAC(+e.target.value))}
                />
            </div>

            <div className={style.experience}>
                <div className={style.name}>
                    Опыт работы
                </div>
                <select className={style.select_experience}
                        onChange={(e) => {
                            let expObj = experienceVacancy.filter(c => c.text === e.target.value)[0]
                            dispatch(addExperienceAC(expObj.exp))
                        }}
                >
                    {experienceVacancy.map((c, index) => {
                        return <option key={index}>{c.text}</option>
                    })}
                </select>
            </div>
        </>
    )
}