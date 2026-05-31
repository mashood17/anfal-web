import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm }               from 'react-hook-form'
import { getBranding, updateBranding } from '@/api/menu'
import ImageUploader from '@/components/ui/ImageUploader'
import PageHeader    from '@/components/ui/PageHeader'
import toast         from 'react-hot-toast'
import { useEffect } from 'react'

export default function BrandingPage() {
  const { data, isLoading } = useQuery({ queryKey: ['branding'], queryFn: getBranding })
  const { register, handleSubmit, setValue, watch, reset } = useForm()

  useEffect(() => {
    if (data) reset({
      name:        data.name,
      tagline:     data.tagline,
      phone:       data.phone,
      address:     data.address,
      logo:        data.logo,
      whatsapp:    data.settings?.whatsapp,
      instagram:   data.settings?.instagram,
      hero_images: data.settings?.hero_images || [],
    })
  }, [data, reset])

  const logo        = watch('logo')
  const heroImages  = watch('hero_images') || []

  const mutation = useMutation({
    mutationFn: updateBranding,
    onSuccess: () => toast.success('Branding updated'),
    onError:   () => toast.error('Update failed'),
  })

  if (isLoading) return <div className="text-sm text-gray-500">Loading...</div>

  return (
    <div>
      <PageHeader title="Branding" description="Restaurant info and visuals" />

      <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-6 max-w-xl">

        {/* Basic info */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Basic Info</p>

          {[
            { name: 'name',     label: 'Restaurant Name' },
            { name: 'tagline',  label: 'Tagline' },
            { name: 'phone',    label: 'Phone' },
            { name: 'address',  label: 'Address' },
            { name: 'whatsapp', label: 'WhatsApp Number (with country code)' },
            { name: 'instagram',label: 'Instagram Handle (without @)' },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-xs text-gray-400 mb-1.5">{label}</label>
              <input {...register(name)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2
                           text-sm text-white focus:outline-none focus:border-brand-accent/60" />
            </div>
          ))}
        </div>

        {/* Logo */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Logo</p>
          <ImageUploader
            value={logo}
            onChange={(path) => setValue('logo', path)}
            folder="logos"
          />
        </div>

        {/* Hero images */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Hero Images</p>
          <p className="text-xs text-gray-500">These rotate in the customer menu hero section</p>

          <div className="space-y-3">
            {heroImages.map((img, i) => (
              <div key={i} className="relative">
                <ImageUploader
                  value={img}
                  onChange={(path) => {
                    const updated = [...heroImages]
                    if (path) updated[i] = path
                    else updated.splice(i, 1)
                    setValue('hero_images', updated)
                  }}
                  folder="hero"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setValue('hero_images', [...heroImages, null])}
            className="text-xs text-brand-accent hover:text-brand-accent/80 transition-colors"
          >
            + Add hero image
          </button>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-6 py-2.5 bg-brand-accent text-gray-950 font-semibold text-sm
                     rounded-lg hover:bg-brand-accent/90 transition-colors disabled:opacity-50"
        >
          {mutation.isPending ? 'Saving...' : 'Save Branding'}
        </button>
      </form>
    </div>
  )
}