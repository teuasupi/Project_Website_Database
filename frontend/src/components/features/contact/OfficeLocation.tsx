export function OfficeLocation() {
  return (
    <section className="pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Kunjungi Kantor Kami
          </h2>
          <p className="text-muted-foreground">
            Fakultas Pendidikan Teknologi dan Kejuruan
            <br />
            Universitas Pendidikan Indonesia
            <br />
            Jl. Dr. Setiabudi No.207, Isola, Kec. Sukasari, Kota Bandung, Jawa
            Barat 40154
          </p>
        </div>

        {/* Map Embed */}
        <div className="mx-auto max-w-4xl">
          <div className="bg-muted aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3961.223231644725!2d107.5907098!3d-6.86383!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6bef5a6548d%3A0xa4d65b8ffd0bbc48!2sFaculty%20of%20Technology%20And%20Vocational%20Education!5e0!3m2!1sen!2sid!4v1752943111593!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="text-muted-foreground mt-4 text-center text-sm">
            Kantor alumni terletak di gedung administrasi utama. Cari papan nama
            IKA TEUAS.
          </p>
        </div>
      </div>
    </section>
  );
}
