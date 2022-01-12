import Router, { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import benefitsData from '../../data/benefits'
import signsData from '../../data/signs'
import Image from 'next/image'
import axios from 'axios'

const EditDestinationForm = ({data, id}) => {

    const router = useRouter()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(100)
    const [description, setDescription] = useState('')
    const [guestCapacity, setGuestCapacity] = useState(1)
    const [signs, setSigns] = useState([])
    const [benefits, setBenefits] = useState([])

    const [images, setImages] = useState([])
    // const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const handleBenefitsChange = (benefit) => {
        const set = new Set(benefits)
        if(set.has(benefit)){
            set.delete(benefit)
        }else {
            set.add(benefit)
        }
        setBenefits([...set])
    }

    const handleSignsChange = (sign) => {
        const set = new Set(signs)
        if(set.has(sign)){
            set.delete(sign)
        }else {
            set.add(sign)
        }
        setSigns([...set])
    }

    const handleFileUpload = (e) => {

        const files = Array.from(e.target.files)

        // setImages([])
        // setOldImages([])
        // setImagesPreview([])

        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if(reader.readyState == 2){
                    // set state provides the old state so we can simple spread and add on to it
                    setImages(oldArray => [...oldArray, reader.result])
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })

    }


    const handleDeleteImage = (imgToDelete) =>{
        setImages(images.filter(img => {
            return img !== imgToDelete
        }))
        setImagesPreview(imagesPreview.filter(img => {
            return img !== imgToDelete
        }))
    }


    // Load in data of existing location if editing
    useEffect(() => {
        if(data){
            setName(data.name)
            setDescription(data.description)
            setPrice(data.price)
            setGuestCapacity(data.guestCapacity)
            setSigns(data.signs)
            setBenefits(data.benefits)

            let imageUrls = []

            data.images.forEach(img => {
                imageUrls.push(img.url)
            })

            setImages(imageUrls)
            // setOldImages(imageUrls)
            setImagesPreview(imageUrls)
        }

    }, [data])

    // useEffect(() => {
    //     if(images.length < 1) return;
    //     const imageUrls = []
    //     images.forEach(image => imageUrls.push(URL.createObjectURL(image)))
    //     setImagesPreview(imageUrls)
    // }, [images])

    const handleSubmit = async (e) => {

        e.preventDefault()

        const body = {
            name,
            pricePerNight: price,
            description,
            guestCapacity,
            signs: [...signs],
            benefits: [...benefits],
            
        }

        if(images.length > 0){
            body.images = images
        }

        if(data){
            let link = `/api/destinations/${id}`
            const {data} = await axios.put(link, body)
            router.push('/admin/destinations/')

        } else {
            let link = `/api/destinations`
            const {data} = await axios.post(link, body)
            router.push('/admin/destinations')
        }

    }


    return (
        <form>
            <input 
                id="name"
                name="name"
                type="text" 
                placeholder='Destination Name'
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <label htmlFor="price">Price Per Night</label>
            <input 
                id="price"
                name="price"
                type="number" 
                value={price}
                min={1}
                max={10000}
                step={1}
                onChange={e => setPrice(e.target.value)}
            />
            <label htmlFor="guestCapacity">Guest Capacity</label>
            <input 
                id="guestCapacity"
                name="guestCapacity"
                type="number" 
                min={1}
                max={1000}
                step={1}
                value={guestCapacity}
                onChange={e => setGuestCapacity(e.target.value)}
            />
            <label htmlFor="description_field">Description</label>
            <textarea
            className="form-control"
            id="description_field"
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            ></textarea>


            {signsData.map((sign, index)=> (
                <div key={sign}>
                <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={sign}
                    value={sign}
                    checked={signs.includes(sign)}
                    onChange={() => handleSignsChange(sign)}
                  />
                <label htmlFor={`custom-checkbox-${index}`}>{sign}</label>
                </div>
            ))}


            {benefitsData.map((benefit, index)=> (
                <div key={benefit}>
                <input
                    type="checkbox" 
                    id={`custom-checkbox-${index}`}
                    name={benefit}
                    value={benefit}
                    checked={benefits.includes(benefit)}
                    onChange={() => handleBenefitsChange(benefit)}
                  />
                <label htmlFor={`custom-checkbox-${index}`}>{benefit}</label>
                </div>
            ))}

            <input type="file" multiple accept="image/*" onChange={handleFileUpload} />
            {imagesPreview.map(imgUrl => (
                <div key={imgUrl} style= {{height: 40, width:40}} className="relative">
                    <Image className="w-full" src={imgUrl} layout="fill" objectFit="cover"/>
                    <div className='absolute top-0 right-0'
                        onClick={()=>handleDeleteImage(imgUrl)}
                    >
                    X
                    </div>
                </div>
            ))}

            <button onClick={handleSubmit}>Create</button>
        </form>
    )
}

export default EditDestinationForm
