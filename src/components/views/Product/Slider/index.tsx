import React, { useEffect, useRef, useState } from 'react'
import { Grid, List, styled, ListItem, Breadcrumbs } from '@mui/material';
import Image from 'next/image';
import Buttons from '../../../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getOneModel, selectOneModel } from '../../../../data/get_one_model';
import { setShowModelsModal } from '../../../../data/loader'
import { Box } from '@mui/system';

const SimpleListItem = styled(ListItem)(
    ({ theme }) => `
        width: 56px;
        height: 56px;   
        border: 1px solid #e0e0e0;
        padding: 0;
        cursor: pointer;

        &.MuiListItem-slider__item--active{
            border-color: #7210be;
        }

      

        &.MuiListItem-slider__big--item{
            width: 100%;
            height: 558px;
            border: none;

            &:hover{
                
            }
        }
  `
);

const SimpleImage = styled(Image)(
    ({ theme }) => `
        min-width: 100%;
        max-width: 100%;
    `
)
const myLoader = () => {
    return `/../../../../../img/card-loader.jpg`
}
const fakeModelImages = [1, 2, 3, 4, 5]
const SimpleSlider = ({ name }: any) => {
    const [sliderBtnHover, setSliderBtnHover] = useState(0)
    const dispatch = useDispatch<any>()
    const simpleModel = useSelector(selectOneModel);
    const simple_model_status = useSelector((state: any) => state?.get_one_model?.status);

    const [sliderCount, setSliderCount] = React.useState(0)
    const [sliderTransition, setSliderTransition] = React.useState(0.4)


    function SliderRightHandler() {
        if (sliderCount < simpleModel?.data?.images?.length - 1) {
            setSliderCount(sliderCount + 1)
        }
    }

    function SliderLeftHandler() {
        if (sliderCount >= 1) {
            setSliderCount(sliderCount - 1)
        }
    }


    const ListStyle = {
        transform: `translateX(-${sliderCount * (name === "slider" ? 507 : 720)}px)`,
        padding: "0 !important",
        display: "flex",
        width: `${simpleModel?.data?.images?.length * (name === "slider" ? 507 : 720)}px`,
        transition: `all ${sliderTransition}s ease`
    }

    const ButtonHover = {
        opacity: sliderBtnHover
    }
    if (simple_model_status === "succeeded") {
        return (
            <>
                <Grid
                    sx={
                        name === "slider" ? {
                            display: "flex",
                            flexDirection: "unset",
                            marginTop: "20px",
                        } : {
                            display: "flex",
                            flexDirection: "column-reverse"
                        }
                    }
                    container={name === "slider" ? true : false}
                    spacing={name === "slider" ? 2 : 1}
                    item
                    xs={name === "slider" ? 6 : 12}

                >
                    <Grid sx={name === "slider" ? { padding: "0 0 0 18px !important" } : { padding: "11px !important", display: "flex", justifyContent: "center" }} item xs={name === "slider" ? 2 : 12}  >
                        <List sx={{ padding: "0 !important", display: `${name === "slider" ? "block" : "flex"}` }}>
                            {
                                simpleModel?.data?.images?.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        sx={name === "slider" ? { margin: "0 0 8px 0" } : { margin: "0 8px 0 0" }}
                                        className={`${sliderCount == index ? "MuiListItem-slider__item--active" : ""}`}
                                        onClick={() => setSliderCount(index)}
                                        key={index}
                                    >
                                        <Image
                                            width={56}
                                            height={56}
                                            alt="slider"
                                            src={`${slide?.image?.src}`}
                                        />
                                    </SimpleListItem>
                                ))
                            }

                        </List>
                    </Grid>
                    <Grid
                        sx={name === "slider" ?
                            { overflow: "hidden", position: "relative", padding: "0 0 18px 0 !important" } : { padding: "0 !important", overflow: "hidden" }}
                        item
                        xs={name === "slider" ? 10 : 12}
                        onMouseEnter={() => setSliderBtnHover(1)}
                        onMouseLeave={() => setSliderBtnHover(0)}
                    >
                        <Box sx={ButtonHover}>
                            <Buttons
                                onClick={SliderRightHandler}
                                type="button"
                                className="slider__right--arrow"
                                name=""
                            >
                                <Image
                                    alt="Icons"
                                    src="/icons/slider-arrow-right.svg"
                                    width="9px"
                                    height="14px"
                                />
                            </Buttons>
                        </Box>
                        <Box sx={ButtonHover}>
                            <Buttons
                                onClick={SliderLeftHandler}
                                type="button"
                                className="slider__left--arrow"
                                name=""
                            >
                                <Image
                                    alt="Icons"
                                    src="/icons/slider-arrow-left.svg"
                                    width="9px"
                                    height="14px"
                                />
                            </Buttons>
                        </Box>
                        <List sx={ListStyle}>
                            {
                                simpleModel?.data?.images?.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        className="MuiListItem-slider__big--item"
                                        onClick={(e) => { dispatch(setShowModelsModal(true)) }}
                                        key={index}
                                    >
                                        <SimpleImage
                                            layout='fill'
                                            objectFit='fill'
                                            src={`${slide?.image?.src}`}
                                        />
                                    </SimpleListItem>
                                ))
                            }

                        </List>
                    </Grid>
                </Grid>
            </>
        )
    } else {
        return (
            <>
                <Grid
                    sx={
                        name === "slider" ? {
                            display: "flex",
                            flexDirection: "unset",
                            marginTop: "20px"
                        } : {
                            display: "flex",
                            flexDirection: "column-reverse"
                        }
                    }
                    container={name === "slider" ? true : false}
                    spacing={name === "slider" ? 2 : 1}
                    item
                    xs={name === "slider" ? 6 : 12}
                >
                    <Grid
                        sx={name === "slider" ? { padding: "0 0 0 18px !important" } :
                            {
                                padding: "11px !important",
                                display: "flex",
                                justifyContent: "center"
                            }
                        }
                        xs={name === "slider" ? 2 : 12}
                        item
                    >
                        <List
                            sx={{
                                padding: "0 !important",
                                display: `${name === "slider" ? "block" : "flex"}`
                            }}
                        >
                            {
                                fakeModelImages.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        sx={name === "slider" ? { margin: "0 0 8px 0" } : { margin: "0 8px 0 0" }}
                                        className={`${sliderCount == index ? "MuiListItem-slider__item--active" : ""}`}
                                        onClick={() => setSliderCount(index)}
                                        key={index}
                                    >
                                        <Image
                                            loader={myLoader}
                                            width={56}
                                            height={56}
                                            alt="slider"
                                            src={`/../../../../img/card-loader.jpg`}
                                        />
                                    </SimpleListItem>
                                ))
                            }

                        </List>
                    </Grid>
                    <Grid
                        sx={name === "slider" ?
                            { overflow: "hidden", position: "relative", padding: "0 0 18px 0 !important" } : { padding: "0 !important", overflow: "hidden" }}
                        item
                        xs={name === "slider" ? 10 : 12}
                    >
                        <Buttons
                            onClick={SliderRightHandler}
                            type="button"
                            className="slider__right--arrow"
                            name=""
                        >
                            <Image
                                alt="Icons"
                                src="/icons/slider-arrow-right.svg"
                                width="9px"
                                height="14px"
                            />
                        </Buttons>
                        <Buttons
                            onClick={SliderLeftHandler}
                            type="button"
                            className="slider__left--arrow"
                            name=""
                        >
                            <Image
                                alt="Icons"
                                src="/icons/slider-arrow-left.svg"
                                width="9px"
                                height="14px"
                            />
                        </Buttons>
                        <List sx={ListStyle}>
                            {
                                fakeModelImages.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        className="MuiListItem-slider__big--item"
                                        onClick={(e) => { dispatch(setShowModelsModal(true)) }}
                                        key={index}
                                    >
                                        <SimpleImage
                                            loader={myLoader}
                                            width={497}
                                            height={558}
                                            layout='fill'
                                            objectFit='fill'
                                            src={`/../../../../../img/card-loader.jpg`}
                                        />
                                    </SimpleListItem>
                                ))
                            }

                        </List>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default SimpleSlider