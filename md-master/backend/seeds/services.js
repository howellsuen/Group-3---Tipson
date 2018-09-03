exports.seed = function(knex, Promise) {
  return knex('services').insert([
 {
      id: 011,
      service_name: 'Sai Ying Pun Maternal and Child Health Centre',
      service_type: 'Child Healthcare'

  },   {
      id: 021,
      service_name: 'Purest Gym',
      service_type: 'Lifestyle'
  },  
  {
      id: 022,
      service_name: 'Rainbow Playgroup',
      service_type: 'Lifestyle'
  },  
  {
      id: 031,
      service_name: 'Littleton Discovery Playgroup',
      service_type: 'Playgroup'
  },
  {
      id: 051,
      service_name: 'Little Sprouts Playgroup and Preschool',
      service_type: 'Education Centre'
  },
{
      id: 041,
      service_name: 'Domestic Helper Services',
      service_type: 'Employment Agency'
  },
{
      id: 042,
      service_name: 'Arrow Employment Services',
      service_type: 'Employment Agency'
  },
{
      id: 023,
      service_name: 'Pause Rewind n Fastforward Studio',
      service_type: 'Lifestyle'
  },
{
      id: 024,
      service_name: 'Teapot Art & Craft Workshop',
      service_type: 'Lifestyle'
  },
{
      id: 015,
      service_name: 'Mother’s Choice - Social Career',
      service_type: 'Consultation'
  },

], )
}
