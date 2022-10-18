USE [SAP]
GO

/****** Object:  Table [dbo].[ZTST_TRAINSIGNIN2]    Script Date: 2022/10/18 11:09:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ZTST_TRAINSIGNIN2](
	[userid] [nvarchar](10) NOT NULL,
	[classid] [nvarchar](10) NOT NULL,
	[trainee] [nvarchar](10) NOT NULL,
	[signin] [nvarchar](1) NULL,
	[homework] [decimal](18, 0) NULL,
	[homeworkURL] [nvarchar](100) NULL,
 CONSTRAINT [PK_ZTST_TRAINSIGNIN2] PRIMARY KEY CLUSTERED 
(
	[userid] ASC,
	[classid] ASC,
	[trainee] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]
GO
