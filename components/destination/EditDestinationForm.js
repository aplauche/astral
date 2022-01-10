import Router, { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import benefitsData from '../../data/benefits'
import signsData from '../../data/signs'


const EditDestinationForm = ({data}) => {

    const router = useRouter()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(100)
    const [description, setDescription] = useState('')
    const [guestCapacity, setGuestCapacity] = useState(1)
    const [signs, setSigns] = useState(new Set())
    const [benefits, setBenefits] = useState(new Set())


    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const handleBenefitsChange = (benefit) => {
        if(benefits.has(benefit)){
            benefits.delete(benefit)
        }else {
            benefits.add(benefit)
        }
    }
    const handleSignsChange = (sign) => {
        if(signs.has(sign)){
            signs.delete(sign)
        }else {
            signs.add(sign)
        }
    }

    useEffect(() => {
        if(data){
            setName(data.name)
            setDescription(data.description)

        }

    }, [data])

    const handleSubmit = async () => {

        const body = {
            name,
            pricePerNight: price,
            description,
            guestCapacity,
            signs: [...signs],
            benefits: [...benefits]

        }

        if(data._id){
            let link = `/api/admin/destinations/${data._id}`
            const {data} = await axios.put(link, body)
            router.push('/admin/destinations/')

        } else {
            let link = `/api/admin/destinations`
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
                    defaultChecked={signs.has(sign)}
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
                    defaultChecked={benefits.has(benefit)}
                    onChange={() => handleBenefitsChange(benefit)}
                  />
                <label htmlFor={`custom-checkbox-${index}`}>{benefit}</label>
                </div>
            ))}
            
        </form>
    )
}

export default EditDestinationForm
