# USER & AUTHENTICATION GROUP
# Users Model
npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string,verificationStatus:boolean,resetToken:string,resetTokenExpires:date,isActive:boolean,lastLogin:date

# Profiles Model
npx sequelize-cli model:generate --name Profile --attributes userId:integer,firstName:string,lastName:string,profilePicture:string,gender:string,birthDate:date,phoneNumber:string,address:text,city:string,province:string,postalCode:string,bio:text,nim:string,entryYear:integer,graduationYear:integer,currentSemester:integer,specialization:string,gpa:decimal,degree:enum:string,thesisTitle:text,currentCompany:string,currentPosition:string,industry:string,linkedinUrl:string,yearsOfExperience:integer,profileType:enum:string

# TAXONOMY & CLASSIFICATION GROUP
# Categories Model
npx sequelize-cli model:generate --name Category --attributes name:string,slug:string,description:text,parentId:integer

# Tags Model
npx sequelize-cli model:generate --name Tag --attributes name:string,slug:string

# FORUM DISCUSSION GROUP
# ForumTopics Model
npx sequelize-cli model:generate --name ForumTopic --attributes categoryId:integer,title:string,content:text,authorId:integer,isClosed:boolean,isPinned:boolean,lastActivityAt:date

# ForumPosts Model
npx sequelize-cli model:generate --name ForumPost --attributes topicId:integer,content:text,authorId:integer,parentId:integer

# CONTENT MANAGEMENT (NEWS) GROUP
# News Model
npx sequelize-cli model:generate --name News --attributes title:string,slug:string,content:text,excerpt:text,featuredImage:string,authorId:integer,isPublished:boolean,isFeatured:boolean

# NewsCategory Junction Model
npx sequelize-cli model:generate --name NewsCategory --attributes newsId:integer,categoryId:integer

# NewsTag Junction Model
npx sequelize-cli model:generate --name NewsTag --attributes newsId:integer,tagId:integer

# CONTENT MANAGEMENT (ARTICLES) GROUP
# Articles Model
npx sequelize-cli model:generate --name Article --attributes title:string,slug:string,content:text,excerpt:text,featuredImage:string,authorId:integer,isPublished:boolean,isFeatured:boolean

# ArticleCategory Junction Model
npx sequelize-cli model:generate --name ArticleCategory --attributes articleId:integer,categoryId:integer

# ArticleTag Junction Model
npx sequelize-cli model:generate --name ArticleTag --attributes articleId:integer,tagId:integer

# COMMENTS GROUP
# Comments Model
npx sequelize-cli model:generate --name Comment --attributes content:text,userId:integer,articleId:integer,forumId:integer,newsId:integer,parentId:integer,isApproved:boolean

# EVENTS MANAGEMENT GROUP
# Events Model
npx sequelize-cli model:generate --name Event --attributes title:string,slug:string,description:text,eventDate:date,eventTime:time,endDate:date,endTime:time,eventLocation:string,eventType:string,maxParticipants:integer,registrationDeadline:date,featuredImage:string,organizerId:integer,isPublished:boolean,isFeatured:boolean

# EventCategory Junction Model
npx sequelize-cli model:generate --name EventCategory --attributes eventId:integer,categoryId:integer

# EventRegistration Model
npx sequelize-cli model:generate --name EventRegistration --attributes eventId:integer,userId:integer,registrationDate:date,attendanceStatus:string,attendanceNotes:text

# GALLERY MANAGEMENT GROUP
# Galleries Model
npx sequelize-cli model:generate --name Gallery --attributes title:string,description:text,type:string,filePath:string,thumbnailPath:string,uploaderId:integer,eventId:integer,newsId:integer,articleId:integer,isPublished:boolean

# GalleryTag Junction Model
npx sequelize-cli model:generate --name GalleryTag --attributes galleryId:integer,tagId:integer

# SCHOLARSHIP MANAGEMENT GROUP
# Scholarships Model
npx sequelize-cli model:generate --name Scholarship --attributes name:string,description:text,requirements:text,amount:decimal,applicationdeadline:date,selectionDate:date,announcementDate:date,startDate:date,endDate:date,applicationFormUrl:string,provider:string,contactPerson:string,contactEmail:string,status:string,isPublished:boolean,featuredImage:string,slug:string

# ScholarshipRecipients Model
npx sequelize-cli model:generate --name ScholarshipRecipient --attributes scholarshipId:integer,userId:integer,year:integer,batch:string,major:string,successStory:text,testimonial:text,featuredImage:string

# ScholarshipApplications Model
npx sequelize-cli model:generate --name ScholarshipApplication --attributes scholarshipId:integer,userId:integer,applicationDate:date,status:string,review_notes:text

# DONATION WITH STATIC QRIS GROUP
# QrisAccounts Model
npx sequelize-cli model:generate --name QrisAccount --attributes accountName:string,qrisImagePath:string,bankAccountNumber:string,bankName:string,merchantName:string,merchantId:string,description:text,isActive:boolean

# DonationPrograms Model
npx sequelize-cli model:generate --name DonationProgram --attributes name:string,description:text,targetAmount:decimal,currentAmount:decimal,startDate:date,endDate:date,status:string,featuredImage:string,qrisAccountId:integer,slug:string

# ManualDonationEntries Model
npx sequelize-cli model:generate --name ManualDonationEntry --attributes amount:decimal,donorName:string,donationDate:date,transactionReference:string,notes:text,programId:integer,qrisAccountId:integer,isVerified:boolean,verifiedBy:integer,verification_Date:date

# DonorRegistrations Model
npx sequelize-cli model:generate --name DonorRegistration --attributes donorName:string,email:string,phone:string,donationAmount:decimal,donationDate:date,transactionReference:string,programId:integer,isAnonymous:boolean,message:text,isVerified:boolean

# DonationReports Model
npx sequelize-cli model:generate --name DonationReport --attributes title:string,description:text,periodStart:date,periodEnd:date,totalReceived:decimal,totalUsed:decimal,reportFile:string,isPublished:boolean,programId:integer