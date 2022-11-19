const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { 
    domains: ["cdn.macbro.uz", "https://cdn.macbro.uz/", "147.182.187.59", 
    "http://147.182.187.59:8800/", "tridmo.s3.eu-central-1.amazonaws.com",
    "tridmo-bucket.s3.eu-central-1.amazonaws.com",'https:/demod-bucket.s3.eu-central-1.amazonaws.com',"demod-bucket.s3.eu-central-1.amazonaws.com ","demod-bucket.s3.eu-central-1.amazonaws.com"]
  }
}
  
module.exports = nextConfig
