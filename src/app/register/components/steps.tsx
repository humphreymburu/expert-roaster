import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { type ExpertFormData } from "../schema";


interface StepProps {
    form: UseFormReturn<ExpertFormData>;
}

export function PersonalInfoStep({ form }: StepProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            {...register('personalInfo.fullName')}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.personalInfo?.fullName && (
            <p className="text-sm text-red-500">{errors.personalInfo.fullName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('personalInfo.email')}
            type="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.personalInfo?.email && (
            <p className="text-sm text-red-500">{errors.personalInfo.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Country</label>
          <input
            {...register('personalInfo.country')}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Region</label>
          <input
            {...register('personalInfo.region')}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Professional Bio</label>
        <textarea
          {...register('personalInfo.bio')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 min-h-[120px]"
        />
        {errors.personalInfo?.bio && (
          <p className="text-sm text-red-500">{errors.personalInfo.bio.message}</p>
        )}
      </div>
    </div>
  );
}

export function ExpertiseStep({ form }: StepProps) {
  const { register, control, formState: { errors } } = form;
  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: 'expertise.languages',
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'expertise.skills',
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'expertise.experiences',
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-xl font-semibold">Expertise & Skills</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Areas of Expertise</label>
          <select
            multiple
            {...register('expertise.expertiseAreas')}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="Public Health">Public Health</option>
            <option value="Environmental Sciences">Environmental Sciences</option>
            <option value="Education">Education</option>
          </select>
          {errors.expertise?.expertiseAreas && (
            <p className="text-sm text-red-500">{errors.expertise.expertiseAreas.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Years of Experience</label>
          <input
            type="number"
            {...register('expertise.yearsExperience', {
              valueAsNumber: true,
            })}
            min="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.expertise?.yearsExperience && (
            <p className="text-sm text-red-500">{errors.expertise.yearsExperience.message}</p>
          )}
        </div>

        {/* Skills Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Skills</label>
            <button
              type="button"
              onClick={() => appendSkill({ name: '', category: '', level: '' })}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Add Skill
            </button>
          </div>

          {skillFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <input
                  {...register(`expertise.skills.${index}.name`)}
                  placeholder="Skill name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <select
                  {...register(`expertise.skills.${index}.category`)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select category</option>
                  <option value="Technical">Technical</option>
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="Domain Knowledge">Domain Knowledge</option>
                </select>
              </div>
              <div className="flex gap-2">
                <select
                  {...register(`expertise.skills.${index}.level`)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Languages Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Languages</label>
            <button
              type="button"
              onClick={() => appendLanguage({ name: '', proficiency: '' })}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Add Language
            </button>
          </div>

          {languageFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-4 items-end">
              <div className="space-y-2">
                <input
                  {...register(`expertise.languages.${index}.name`)}
                  placeholder="Language name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="flex gap-2">
                <select
                  {...register(`expertise.languages.${index}.proficiency`)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Native">Native</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Fields */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Work Experience</label>
            <button
              type="button"
              onClick={() => appendExperience({
                role: '',
                organization: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                skills: []
              })}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Add Experience
            </button>
          </div>

          {experienceFields.map((field, index) => (
            <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <input
                    {...register(`expertise.experiences.${index}.role`)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Organization</label>
                  <input
                    {...register(`expertise.experiences.${index}.organization`)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <input
                    {...register(`expertise.experiences.${index}.location`)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    {...register(`expertise.experiences.${index}.startDate`)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    {...register(`expertise.experiences.${index}.endDate`)}
                    disabled={form.watch(`expertise.experiences.${index}.current`)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register(`expertise.experiences.${index}.current`)}
                    className="rounded border-gray-300"
                  />
                  <label className="text-sm text-gray-700">Current Position</label>
                </div>

                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    {...register(`expertise.experiences.${index}.description`)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Remove Experience
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EducationStep({ form }: StepProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          type="button"
          onClick={() =>
            append({
              degree: "",
              field: "",
              institution: "",
              year: "",
            })
          }
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border border-gray-200 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Education #{index + 1}</h3>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Degree
                </label>
                <input
                  {...register(`education.${index}.degree`)}
                  placeholder="e.g., Bachelor of Science"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.education?.[index]?.degree && (
                  <p className="text-sm text-red-500">
                    {errors.education[index]?.degree?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Field of Study
                </label>
                <input
                  {...register(`education.${index}.field`)}
                  placeholder="e.g., Computer Science"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.education?.[index]?.field && (
                  <p className="text-sm text-red-500">
                    {errors.education[index]?.field?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  {...register(`education.${index}.institution`)}
                  placeholder="University name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.education?.[index]?.institution && (
                  <p className="text-sm text-red-500">
                    {errors.education[index]?.institution?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  {...register(`education.${index}.year`)}
                  placeholder="Year of completion"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.education?.[index]?.year && (
                  <p className="text-sm text-red-500">
                    {errors.education[index]?.year?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CertificationsStep({ form }: StepProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <button
          type="button"
          onClick={() =>
            append({
              title: "",
              issuer: "",
              issueDate: "",
              expiryDate: "",
              documentUrl: "",
              verificationStatus: "Pending",
            })
          }
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Add Certification
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border border-gray-200 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Certification #{index + 1}</h3>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  {...register(`certifications.${index}.title`)}
                  placeholder="Certification name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.certifications?.[index]?.title && (
                  <p className="text-sm text-red-500">
                    {errors.certifications[index]?.title?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Issuing Organization</label>
                <input
                  {...register(`certifications.${index}.issuer`)}
                  placeholder="Organization name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.certifications?.[index]?.issuer && (
                  <p className="text-sm text-red-500">
                    {errors.certifications[index]?.issuer?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Issue Date</label>
                <input
                  type="date"
                  {...register(`certifications.${index}.issueDate`)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.certifications?.[index]?.issueDate && (
                  <p className="text-sm text-red-500">
                    {errors.certifications[index]?.issueDate?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  {...register(`certifications.${index}.expiryDate`)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">Document URL</label>
                <input
                  type="url"
                  {...register(`certifications.${index}.documentUrl`)}
                  placeholder="https://"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PublicationsStep({ form }: StepProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "publications",
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Publications</h2>
        <button
          type="button"
          onClick={() =>
            append({
              title: "",
              journal: "",
              year: "",
              url: "",
            })
          }
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Add Publication
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field: { id: string }, index: number) => (
          <div
            key={field.id}
            className="p-4 border border-gray-200 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Publication #{index + 1}</h3>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  {...register(`publications.${index}.title`)}
                  placeholder="Publication title"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.publications?.[index]?.title && (
                  <p className="text-sm text-red-500">
                    {errors.publications[index]?.title?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Journal</label>
                <input
                  {...register(`publications.${index}.journal`)}
                  placeholder="Journal name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.publications?.[index]?.journal && (
                  <p className="text-sm text-red-500">
                    {errors.publications[index]?.journal?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Year</label>
                <input
                  {...register(`publications.${index}.year`)}
                  placeholder="Publication year"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.publications?.[index]?.year && (
                  <p className="text-sm text-red-500">
                    {errors.publications[index]?.year?.message}
                  </p>
                )}
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">URL</label>
                <input
                  type="url"
                  {...register(`publications.${index}.url`)}
                  placeholder="https://"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReferencesStep({ form }: StepProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "references",
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Professional References</h2>
        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              position: "",
              organization: "",
              email: "",
              phone: "",
              relationship: "",
            })
          }
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Add Reference
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border border-gray-200 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Reference #{index + 1}</h3>
              {index >= 2 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  {...register(`references.${index}.name`)}
                  placeholder="Reference's name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.references?.[index]?.name && (
                  <p className="text-sm text-red-500">
                    {errors.references[index]?.name?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Position
                </label>
                <input
                  {...register(`references.${index}.position`)}
                  placeholder="Current position"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.references?.[index]?.position && (
                  <p className="text-sm text-red-500">
                    {errors.references[index]?.position?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Organization
                </label>
                <input
                  {...register(`references.${index}.organization`)}
                  placeholder="Company/Organization"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.references?.[index]?.organization && (
                  <p className="text-sm text-red-500">
                    {errors.references[index]?.organization?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...register(`references.${index}.email`)}
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.references?.[index]?.email && (
                  <p className="text-sm text-red-500">
                    {errors.references[index]?.email?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  {...register(`references.${index}.phone`)}
                  placeholder="Phone number"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.references?.[index]?.phone && (
                  <p className="text-sm text-red-500">
                    {errors.references[index]?.phone?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Professional Relationship
                </label>
                <input
                  {...register(`references.${index}.relationship`)}
                  placeholder="e.g., Former Manager"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.references?.[index]?.relationship && (
                  <p className="text-sm text-red-500">
                    {errors.references[index]?.relationship?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {fields.length < 2 && (
        <p className="text-sm text-gray-500">
          Please provide at least 2 professional references
        </p>
      )}
    </div>
  );
}
